var Immutable = require("immutable");
var React     = require("react");

var ceres  = require("lib/ceres");

var Header = React.createClass({
    propTypes: {
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        userId: React.PropTypes.string
    },
    login: function () {
        ceres.loginWithFacebook();
    },
    renderLogin: function () {
        var user = this.props.users.get(this.props.userId);
        return (
            user ?
            <span>{user.getIn(["profile", "name"])}</span> :
            <span onClick={this.login}>login</span>
        );
    },
    render: function () {
        return (
            <div className="ac-header">
                {this.renderLogin()}
            </div>
        );
    }
});

module.exports = Header;
