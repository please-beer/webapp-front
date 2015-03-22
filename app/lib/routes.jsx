var React = require("react");
var Router = require("react-router");

var views = require("views");

module.exports = (
    <Router.Route name="root" path="/" handler={views.Root}>
        <Router.Route name="campaignEdit" path="campaign/:_id/edit/" handler={views.CampaignEdit} />
        <Router.Route name="campaignView" path="campaign/:_id/" handler={views.CampaignView} />
        <Router.Route name="organizationEdit" path="organization/:_id/edit/" handler={views.OrganizationEdit} />
        <Router.Route name="organizationView" path="organization/:_id/" handler={views.OrganizationView} />
        <Router.DefaultRoute handler={views.Home} />
    </Router.Route>
);
