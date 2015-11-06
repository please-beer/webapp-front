var React = require("react");
var ReactRouter = require("react-router");
//import { Router, Route, IndexRoute, Link } from 'react-router'
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var views = require("views");


class SignedIn extends React.Component {
  render() {
    return (
      <div>
        <h2>Signed In</h2>
        {this.props.children}
      </div>
    )
  }
}


class SignedOut extends React.Component {
  render() {
    return (
      <div>
        <h2>Signed Out</h2>
        {this.props.children}
      </div>
    )
  }
}

class SignIn extends React.Component {
  render() {
    return (
      <h3>Please sign in.</h3>
    )
  }
}

class ForgotPassword extends React.Component {
  render() {
    return (
      <h3>Forgot your password?</h3>
    )
  }
}

module.exports = (
    <Route  path="/" component={views.Root}>
    	<IndexRoute component={views.Home}/>
        <Route path="campaign/:_id/edit/" component={views.CampaignEdit} />
        <Route path="campaign/:_id/" component={views.CampaignView} />
        <Route path="organization/:_id/edit/" component={views.OrganizationEdit} />
        <Route path="organization/:_id/" component={views.OrganizationView} />
        <Route path="profile/" component={views.Profile} />
    </Route>
);
