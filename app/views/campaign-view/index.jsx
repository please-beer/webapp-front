var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");
var url       = require("url");

var components = require("components");
var ceres      = require("lib/ceres");

var CampaignView = React.createClass({
    render: function () {
        return (
            <div className="av-campaign-view">
                CAMPAIGN VIEW
            </div>
        );
    }
});

module.exports = CampaignView;
