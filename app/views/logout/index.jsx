var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var ceres      = require("lib/ceres");
var ReactAsteroid = require("lib/react-asteroid");
var pure       = require("lib/pure");

var Logout = React.createClass({    
    mixins: [
        ReactAsteroid.getControllerViewMixin(["users"])
    ],
    componentWillMount: function () {
        ceres.logout();
    },
    render: function () {
        return (
            <div className="av-home">
                <pure.Grid>
                    <pure.Col sm={"1-3"}>
                    </pure.Col>
                    <pure.Col sm={"1-3"}>
                        You have been logged out.
                    </pure.Col>
                    <pure.Col sm={"1-3"}>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = Logout;
