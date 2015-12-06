var Immutable = require("immutable");
var React     = require("react");

var ceres  = require("lib/ceres");

var LoginForm = React.createClass({
    propTypes: {
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        userId: React.PropTypes.string
    },
    loginFB: function () {
        ceres.loginWithFacebook();
    },
    loginG: function () {
        ceres.loginWithGoogle();
    },
    logout: function () {
        ceres.logout();
    },
    renderLogin: function () {
        var user = this.props.users.get(this.props.userId);
        return (
            user ?
            <div><span>Hello, {user.getIn(["profile", "name"])}</span> <span onClick={this.logout}>Signout</span></div> :
            <div className="login-buttons"><span className="facebook-button" onClick={this.loginFB}>Sign in with Facebook</span>
            <span className="google-button" onClick={this.loginG}>Sign in with Google</span></div>
        );
    },
    render: function () {
        return (
            <div className="login-form">
                {this.renderLogin()}
            </div>
        );
    }
});

module.exports = LoginForm;
