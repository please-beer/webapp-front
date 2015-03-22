var React  = require("react");
var Router = require("react-router");

var components    = require("components");
var ceres         = require("lib/ceres");
var ReactAsteroid = require("lib/react-asteroid");

var Root = React.createClass({
    mixins: [
        ReactAsteroid.getControllerViewMixin(["campaigns", "organizations", "users"])
    ],
    render: function () {
        return (
            <div className="av-root">
                <div className="header">
                    <components.Header {...this.state} />
                </div>
                <div className="content">
                    <Router.RouteHandler {...this.state} />
                </div>
            </div>
        );
    }
});

module.exports = Root;
