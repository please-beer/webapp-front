var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");

var components  = require("components");
var pure        = require("lib/pure");
var RouterMixin = require("lib/router-mixin");

var OrganizationCard = React.createClass({
    mixins: [RouterMixin],
    propTypes: {
        organization: React.PropTypes.instanceOf(Immutable.Map),
        linkTo: React.PropTypes.oneOf(["View", "Edit"])
    },
    onClick: function () {
        this.context.router.transitionTo("organization" + this.props.linkTo, {
            _id: this.props.organization.get("_id")
        });
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
