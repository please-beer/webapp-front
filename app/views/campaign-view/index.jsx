var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router     = require("react-router");
var History     = Router.History;

var components  = require("components");
var ceres       = require("lib/ceres");
var pure        = require("lib/pure");

var formatDate = function (timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleDateString();
};

var CampaignView = React.createClass({
    mixins: [History],
    pathTo: function (path) {
        return this.props.campaigns.getIn(
            R.prepend(this.props.params._id, path.split("."))
        );
    },
    componentWillMount: function () {
        ceres.subscribe("campaigns:byId", this.props.params._id);
    },
    renderRewards: function () {
        return this.pathTo("rewards") && this.pathTo("rewards")
            .map(function (reward, index) {
                return (
                    <components.RewardCard
                        key={index}
                        reward={reward}
                    />
                );
            })
            .toList();
    },
    render: function () {
        return (
            <div className="av-campaign-view">
                <pure.Grid>
                    <pure.Col md={"2-3"} gutter={0}>
                        <pure.Col md={"1-12"}>
                            <components.SquareImage
                                src={this.pathTo("imageUrl")}
                                size={50}
                            />
                        </pure.Col>
                        <pure.Col md={"11-12"}>
                            <h3>{this.pathTo("title")}</h3>
                        </pure.Col>
                        <pure.Col md={"1-1"}>
                            <components.Markdown
                                string={this.pathTo("text")}
                            />
                        </pure.Col>
                    </pure.Col>
                    <pure.Col md={"1-3"} gutter={0}>
                        <pure.Col md={"1-1"}>
                            <h5>{"Goal"}</h5>
                            <h3>{this.pathTo("goal") + " " + this.pathTo("currency")}</h3>
                            <h5>{"Start date"}</h5>
                            <h3>{formatDate(this.pathTo("startDate"))}</h3>
                            <h5>{"End date"}</h5>
                            <h3>{formatDate(this.pathTo("endDate"))}</h3>
                        </pure.Col>
                        <pure.Col md={"1-1"}>
                            {this.renderRewards()}
                        </pure.Col>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = CampaignView;
