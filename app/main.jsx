var React = require("react");
var ReactDOM = require("react-dom");
var render = ReactDOM.render;
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var routes = require("lib/routes");
var ceres = require("lib/ceres");
//import { createHistory, useBasename } from 'history'
var historyw = require("history");
var createHistory = historyw.createHistory;
var useBasename = historyw.useBasename;
//console.log(routes); 
var createBrowserHistory = require('history/lib/createBrowserHistory');
var history = createBrowserHistory();
ReactDOM.render(<Router history={history}>{routes}</Router>, document.getElementById('app'));
//console.log(routes);
//ReactDOM.render(<Router>{routes}</Router>, document.getElementById('app')); 

window.ceres = ceres;
window.React = React;