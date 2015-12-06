var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router     = require("react-router");
var History     = Router.History;

var components  = require("components");
var pure        = require("lib/pure");
var RouterMixin = require("lib/router-mixin");

var OrganizationCard = React.createClass({
    mixins: [History],
    propTypes: {
        organization: React.PropTypes.instanceOf(Immutable.Map),
        linkTo: React.PropTypes.oneOf(["view", "edit"])
    },
    onClick: function () {
        var append = ""; 
        if (this.props.linkTo=="edit") append= this.props.linkTo+"/";
        this.history.pushState(null,"/organization" +"/"+this.props.organization.get("_id")+"/"+append);
    },
    render: function () {
        return (
            <components.Panel onClick={this.props.linkTo && this.onClick}>
                <pure.Col sm={"1-5"}>
                    <components.SquareImage
                        src={this.props.organization.get("logoUrl")}
                        size={50}
                    />
                </pure.Col>
                <pure.Col sm={"4-5"}>
                    <h3>{this.props.organization.get("name")}</h3>
                </pure.Col>
            </components.Panel>
        );
    }
});

module.exports = OrganizationCard;
