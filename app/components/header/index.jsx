var Immutable = require("immutable");
var React     = require("react");
var ReactRouter = require("react-router");
var ceres  = require("lib/ceres");
var History = ReactRouter.History;

var Header = React.createClass({
    mixins : [History],
    propTypes: {
        users: React.PropTypes.instanceOf(Immutable.Map).isRequired,
        userId: React.PropTypes.string
    },
    logout: function () {
        ceres.logout();
        this.history.pushState(null, '/login/');
    },
    renderLogin: function () {
        var user = this.props.users.get(this.props.userId);
        return (
            user ?
            <div><span>Cheers, {user.getIn(["profile", "name"])}</span> <span className="logout-icon" onClick={this.logout}></span></div> :
            <a href="/login">login</a>
        );
    },
    render: function () {
        return (
            <div className="inner-header">
                <div className="white-header">{this.renderLogin()}</div>
                <div className="ac-header">
                    <div className="logo"><img src="/assets/images/please-beer.png" width="362px" height="auto"/></div>
                    <ul className="test-menu">
                        <li><a href="/">Home</a></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/campaign-view">Campaign view</a></li>
                        <li><a href="/campaign/edit">Campaign edit</a></li>
                        <li><a href="/organization-view">Organization view</a></li>
                        <li><a href="/organizatino-edit">organization edit</a></li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Header;
