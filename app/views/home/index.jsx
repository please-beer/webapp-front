var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router    = require("react-router");

var components = require("components");
var ceres      = require("lib/ceres");
var pure       = require("lib/pure");

var Home = React.createClass({
    renderPublicCampaigns: function () {
        return this.props.campaigns
            .filter(function (campaign) {
                return campaign.get("public");
            })
            .map(function (campaign) {
                return (
                    <components.CampaignCard
                        key={campaign.get("_id")}
                        campaign={campaign}
                        linkTo={"view"}
                    />
                );
            })
            .toList();
    },
    componentWillMount: function () {
        ceres.subscribe("campaigns:public");
    },
    render: function () {
        return (
            <div className="av-home">
                <pure.Grid>
                    <pure.Col sm={"1-3"}>
                    </pure.Col>
                    <pure.Col sm={"1-3"}>
                        {this.renderPublicCampaigns()}
                    </pure.Col>
                    <pure.Col sm={"1-3"}>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = Home;
