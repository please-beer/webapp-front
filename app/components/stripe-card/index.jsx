var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");
var Router     = require("react-router");
var History     = Router.History;

var components  = require("components");
var pure        = require("lib/pure");
var RouterMixin = require("lib/router-mixin");

var StripeCard = React.createClass({
    onClick: function () {
       
    },
    render: function () {
        return (
            <components.Panel onClick={this.props.linkTo && this.onClick}>
                <pure.Col>
                   Year: <input defaultValue={this.props.data.exp_year} />
                   Month: <input defaultValue={this.props.data.exp_month} />
                   Brand: <input defaultValue={this.props.data.brand} />
                </pure.Col>
            </components.Panel>
        );
    }
});

module.exports = StripeCard;
