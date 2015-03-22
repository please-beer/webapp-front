var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");

var components  = require("components");
var pure        = require("lib/pure");
var RouterMixin = require("lib/router-mixin");

var CampaignCard = React.createClass({
    mixins: [RouterMixin],
    propTypes: {
        campaign: React.PropTypes.instanceOf(Immutable.Map),
        linkTo: React.PropTypes.oneOf(["View", "Edit"])
    },
    onClick: function () {
        this.context.router.transitionTo("campaign" + this.props.linkTo, {
            _id: this.props.campaign.get("_id")
        });
    },
    render: function () {
        return (
            <components.Panel onClick={this.props.linkTo && this.onClick}>
                <pure.Col sm={"1-5"}>
                    <components.SquareImage
                        src={this.props.campaign.get("imageUrl")}
                        size={50}
                    />
                </pure.Col>
                <pure.Col sm={"4-5"}>
                    <h3>{this.props.campaign.get("title")}</h3>
                </pure.Col>
            </components.Panel>
        );
    }
});

module.exports = CampaignCard;
