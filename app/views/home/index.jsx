var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var ceres      = require("lib/ceres");

var Home = React.createClass({
    render: function () {
        return (
            <div className="av-home">
                HELLO HOME
            </div>
        );
    }
});

module.exports = Home;
