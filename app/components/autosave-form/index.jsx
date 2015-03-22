var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var t         = require("tcomb-form");

var utils = require("lib/utils");
var ceres = require("lib/ceres");

var AutosaveForm = React.createClass({
    propTypes: {
        /*
        *   The immutable map of the collection.
        */
        collection: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        /*
        *   The name of the collection.
        */
        collectionName: React.PropTypes.string.isRequired,
        /*
        *   tcomb type of the elements in the collection. Must be a tcomb struct.
        */
        type: function (props) {
            if (R.path(["type", "meta", "kind"], props) !== "struct") {
                return new Error([
                    "Invalid prop `type` of type `",
                    typeof props.type,
                    "` supplied to `FormFor`, expected `tcomb struct`."
                ].join(""));
            }
        },
        /*
        *   The _id of the item we wish to edit.
        */
        itemId: React.PropTypes.string.isRequired,
        /*
        *   The path at which to operate
        */
        path: React.PropTypes.arrayOf(React.PropTypes.string),
        /*
        *   The fields we wish to edit. Defaults to all.
        */
        fields: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.arrayOf(React.PropTypes.string)
        ]),
        /*
        *   Options for the tcomb form component.
        */
        options: React.PropTypes.object
    },
    getFields: function () {
        return (
            R.is(String, this.props.fields) ?
            this.props.fields.split(" ") :
            this.props.fields
        );
    },
    getType: function () {
        var fields = this.getFields();
        return (
            fields ?
            t.struct(R.pick(fields, this.props.type.meta.props)) :
            this.props.type
        );
    },
    save: utils.throttle(function (delta) {
        /*
        *   If delta is null, the form input is not valid, therefore we avoid
        *   saving changes.
        */
        if (delta !== null) {
            /*
            *   If the updatePath is defined, use it to construct the correct
            *   modifier for the operation. Otherwise, the update is occurring
            *   at the root level, therefore delta itself is the correct
            *   modifier.
            */
            var modifier;
            if (this.props.path && this.props.path.length > 0) {
                var path = this.props.path.join(".");
                modifier = R.pipe(
                    R.toPairs,
                    R.map(R.apply(function (key, val) {
                        return [path + "." + key, val];
                    })),
                    R.fromPairs
                )(delta);
            } else {
                modifier = delta;
            }
            ceres.getCollection(this.props.collectionName).update(this.props.itemId, modifier);
        }
    }, 1000),
    onChange: function (value) {
        /*
        *   Update the state with the value provided by the form to our onChange
        *   handler, regardless of whether it's valid or not. This is necessary
        *   as re-renders may occur at any time, triggered by props changes. If
        *   we don't update the state on input change, said re-renders will
        *   reset the input.
        */
        this.setState({
            value: R.merge(this.state.value, value)
        });
        /*
        *   Get the form value, which can either be a valid value or null, and
        *   pass it to our save method. Calling the form's getValue method will
        *   also make the form notify the user of invalid inputs.
        */
        this.save(this.refs.form.getValue());
    },
    getValueFromProps: function (props) {
        var path = (
            props.path ?
            [props.itemId].concat(props.path) :
            [props.itemId]
        );
        return (
            props.collection.getIn(path) ||
            Immutable.Map()
        ).toJS();
    },
    getInitialState: function () {
        return {
            value: this.getValueFromProps(this.props)
        };
    },
    componentWillReceiveProps: function (props) {
        /*
        *   Overwrite the remote state (the one we get from props) with our
        *   local one, which the user may have modified.
        */
        this.setState({
            value: R.merge(this.getValueFromProps(props), this.state.value)
        });
    },
    render: function () {
        return (
            <t.form.Form
                ref="form"
                value={this.state.value}
                onChange={this.onChange}
                type={this.getType()}
                options={this.props.options}
            />
        );
    }
});

module.exports = AutosaveForm;
