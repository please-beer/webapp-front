var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var ceres      = require("lib/ceres");
var ReactAsteroid = require("lib/react-asteroid");
var pure       = require("lib/pure");

var Login = React.createClass({    
    mixins: [
        ReactAsteroid.getControllerViewMixin(["users"])
    ],
    componentWillMount: function () {
        console.log(this);
    },
    render: function () {
        return (
            <div className="av-home">
                <pure.Grid>
                    <pure.Col sm={"1-3"}>
                    </pure.Col>
                    <pure.Col sm={"1-3"}>
                        <components.LoginForm  {...this.state} />
                    </pure.Col>
                    <pure.Col sm={"1-3"}>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = Login;
