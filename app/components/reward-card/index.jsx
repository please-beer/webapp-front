var Immutable   = require("immutable");
var R           = require("ramda");
var React       = require("react");
var Router      = require("react-router");
var History     = Router.History;

var components  = require("components");

var RewardCard = React.createClass({
    mixins: [History],
    propTypes: {
        reward: React.PropTypes.instanceOf(Immutable.Map)
    },
    orderBeer: function() {
        this.history.pushState(null,"/order" +"/"+this.props.campaign+"/"+this.props.index+"/");

    },
    render: function () {
        return (
            <components.Panel>
                    <h4>
                        {"Price: "}
                        {this.props.reward.get("price")}
                    </h4>
                    <h5>
                        {"Available supply: "}
                        {this.props.reward.get("availableSupply")}
                    </h5>
                    <components.Markdown
                        string={this.props.reward.get("description")}
                    />
                    <div className="button button-buy" onClick={this.orderBeer}>Please Beer!</div>
            </components.Panel>
        );
    }
});

module.exports = RewardCard;
