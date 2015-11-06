var React  = require("react");
var ReactDOM  = require("react-dom");
var Router = require("react-router");
var Link = Router.Link;

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
                   {React.cloneElement(this.props.children, {...this.state})}
                </div>
            </div>
        );
    }
});
        
module.exports = Root;
