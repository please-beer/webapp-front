var React = require("react");
var R     = require("ramda");
var t     = require("tcomb-validation");

var Button = require("./button.jsx");

var SquareImageInput = React.createClass({
    getInitialState: function () {
        return {
            hasError: false,
            value: this.props.value
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            value: nextProps.value
        });
    },
    onChange: function (value) {
        this.setState({
            value: value
        }, function () {
            this.props.onChange(value);
        }.bind(this));
    },
    getValue: function () {
        var result = t.validate(this.state.value, this.props.ctx.report.type);
        this.setState({hasError: !result.isValid()});
        return result;
    },
    getOptions: function () {
        return R.pipe(
            R.mapObj.idx(function (label, value) {
                return {
                    label: label,
                    value: value
                };
            }),
            R.values
        )(this.props.ctx.report.type.meta.map);
    },
    getSizeOption: function () {
        return R.path(["options", "config", "size"], this.props) || 50;
    },
    getCircleOption: function () {
        return R.path(["options", "config", "circle"], this.props);
    },
    render: function () {
        return (
            <Button
                src={this.state.value}
                size={this.getSizeOption()}
                circle={this.getCircleOption()}
                onChange={this.onChange}
            />
        );
    }
});

module.exports = SquareImageInput;
