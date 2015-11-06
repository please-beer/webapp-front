var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router     = require("react-router");
var History     = Router.History;

var components  = require("components");
var pure        = require("lib/pure");
var RouterMixin = require("lib/router-mixin");

var CampaignCard = React.createClass({
    mixins: [ History ],
    propTypes: {
        campaign: React.PropTypes.instanceOf(Immutable.Map),
        linkTo: React.PropTypes.oneOf(["view", "edit"])
    },
    onClick: function () {
        var append = ""; 
        if (this.props.linkTo=="edit") append= this.props.linkTo;
        this.history.pushState(null,"campaign" +"/"+this.props.campaign.get("_id")+"/"+append);

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
