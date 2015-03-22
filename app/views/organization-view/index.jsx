var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");
var url       = require("url");

var components = require("components");
var ceres      = require("lib/ceres");

var OrganizationView = React.createClass({
    render: function () {
        return (
            <div className="av-organization-view">
                ORGANIZATION VIEW
            </div>
        );
    }
});

module.exports = OrganizationView;
