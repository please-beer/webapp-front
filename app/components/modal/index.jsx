var React = require("react");

var components = require("components");

var Modal = React.createClass({
    propTypes: {
        open: React.PropTypes.bool
    },
    render: function() {
        return this.props.open ? (
            <div className="ac-modal">
                <div className="ac-modal-body">
                    <components.Panel>
                        {this.props.children}
                    </components.Panel>
                </div>
            </div>
        ) : null;
    }
});

module.exports = Modal;
