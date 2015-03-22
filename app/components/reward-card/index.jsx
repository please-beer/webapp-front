var Immutable = require("immutable");
var R         = require("ramda");
var React     = require("react");

var components  = require("components");

var RewardCard = React.createClass({
    propTypes: {
        reward: React.PropTypes.instanceOf(Immutable.Map)
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
            </components.Panel>
        );
    }
});

module.exports = RewardCard;
