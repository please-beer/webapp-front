var R     = require("ramda");
var React = require("react");

var Grid = React.createClass({
    render: function () {
        return (
            <div className="pure-g" {...this.props} />
        );
    }
});
exports.Grid = Grid;

var Col = React.createClass({
    propTypes: {
        sm: React.PropTypes.string,
        md: React.PropTypes.string,
        lg: React.PropTypes.string,
        xl: React.PropTypes.string,
        gutter: React.PropTypes.number
    },
    getClassName: function () {
        return R.pipe(
            R.filter(R.identity),
            R.join(" ")
        )([
            "pure-u-1",
            (this.props.sm && "pure-u-sm-" + this.props.sm),
            (this.props.md && "pure-u-md-" + this.props.md),
            (this.props.lg && "pure-u-lg-" + this.props.lg),
            (this.props.xl && "pure-u-xl-" + this.props.xl),
            this.props.className
        ]);
    },
    getStyle: function () {
        return R.merge({
            boxSizing: "border-box",
            padding: this.props.gutter || 15
        }, this.props.style);
    },
    getProps: function () {
        return R.omit(["sm", "md", "lg", "xl", "gutter", "className", "style"], this.props);
    },
    render: function () {
        return (
            <div
                style={this.getStyle()}
                className={this.getClassName()}
                {...this.getProps()}
            />
        );
    }
});
exports.Col = Col;
