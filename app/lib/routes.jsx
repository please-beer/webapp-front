var React = require("react");
var ReactRouter = require("react-router");
//import { Router, Route, IndexRoute, Link } from 'react-router'
var Router = ReactRouter.Router;
var IndexRoute = ReactRouter.IndexRoute;
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;
var views = require("views");
var ceres = require("lib/ceres");

function requireAuth(nextState, replaceState, callback) {
    
    //We are using callback based requireAuth function to wait till we will know if the user is logged in or not
    //we use Asteroid.resumeLoginPromise to check if user is still logged in or not
    ceres.on("connected", function() {
        console.log("connected");   
        ceres.resumeLoginPromise
            .then(function () { console.log(ceres.isConnected);  callback();})
                .fail(function (error) { replaceState({ nextPathname: nextState.location.pathname }, '/login/');  callback(); console.log("erorr"); });
        callback();         
    });
}
module.exports = (
    <Route  path="/" component={views.Root}>
    	<IndexRoute component={views.Home}/>
        <Route path="campaign/:_id/edit/" component={views.CampaignEdit} />
        <Route path="campaign/:_id/" component={views.CampaignView} />
        <Route path="organization/:_id/edit/" component={views.OrganizationEdit} />
        <Route path="organization/:_id/" component={views.OrganizationView} />
        <Route path="profile/" component={views.Profile}  onEnter={requireAuth}/>
        <Route path="login/" component={views.Login} />
        <Route path="logout/" component={views.Logout} />
    </Route>
);
