var React = require("react");

var SquareImage = React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        size: React.PropTypes.number,
        circle: React.PropTypes.bool,
        onClick: React.PropTypes.func
    },
    render: function() {
        var style = {
            width: this.props.size,
            height: this.props.size,
            borderRadius: (this.props.circle ? "100%" : 2),
            cursor: this.props.onClick ? "pointer": ""
        };
        return (
            <img
                style={style}
                src={this.props.src}
                onClick={this.props.onClick}
            />
        );
    }
});

module.exports = SquareImage;
