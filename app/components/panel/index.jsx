var React = require("react");

var Panel = React.createClass({
    propTypes: {
        onClick: React.PropTypes.func
    },
    render: function() {
        var style = {
            cursor: (this.props.onClick ? "pointer" : "")
        };
        return (
            <div style={style} className="ac-panel" onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Panel;
