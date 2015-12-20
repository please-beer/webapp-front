var R           = require("ramda");
var React       = require("react");
var ReactDOM    = require("react-dom");
var t           = require("tcomb-form");

var components  = require("components");
var ceres       = require("lib/ceres");
var pure        = require("lib/pure");

var Router      = require("react-router");
var History     = Router.History;


var Order = React.createClass({
    getInitialState: function() {
        return {cards: false, processing:false, processingResult:false};
    },

    componentWillMount: function () {
        ceres.subscribe("campaigns:byId", this.props.params.campaign_id);

        ceres.call("users:list-cards").result.then(function(result) {
            if (result) {
                this.setState({cards: result.data.result});
            }
        }.bind(this));
    },
    renderShippingAddress: function () {
        return (
            <pure.Grid>
                <pure.Col md={"3-5"}>

                    Shipping address will be here.
                </pure.Col>
            </pure.Grid>
            );

    },
    renderPaymentInformation: function () {
        var user = this.props.users.get(this.props.userId);
        if (this.state.cards && user)
        {
        return (
            <pure.Grid>
                <pure.Col>
                    Cardholder name: <span>{user.getIn(["profile", "name"])}</span>
                    {this.state.cards.data.map(function(result) {
                    return <components.stripeCard key={result.id} data={result}/>;
                    })}
                </pure.Col>
                <pure.Col>{this.renderPaymentButton()}</pure.Col>
            
            </pure.Grid>
            );
        } else {
        return (
            <pure.Grid>
                <pure.Col>

                    Loading your card data...
                </pure.Col>
            </pure.Grid>
            );
        }

    },
    renderPaymentButton: function() {
        if (this.state.processing) {
            return (
                <span>Please wait while we are processing your payment...</span>
                );
        } else {
            if (this.state.processingResult && this.state.processingResult.result!=="error")
                return (
                    <span>Payment successfull! We will send you an order confirmation to your email! {JSON.stringify(this.state.processingResult.message)} </span>
                    );
            else if (this.state.processingResult.result === "error") {
                return (
                    <span>There was an error procesing your request. Plese try again later. {JSON.stringify(this.state.processingResult.message)} <br/><div className="button button-buy" onClick={this.payForBeer}>Submit payment!</div> we won't charge you until the campaign succeedes!</span>
                    );
            } else {
                return (
                    <span><div className="button button-buy" onClick={this.payForBeer}>Submit payment!</div> we won't charge you until the campaign succeedes!</span>
                    );
            }
        }
    },
    payForBeer: function() {
        this.setState({processing: true});
        ceres.call("users:pay-for-beer","d9f2146c8a5e2e0276edf47ea2db1f5d","50","12 bottles", "Some nice description of what I have bought",this.state.cards.data[0].id).result.then(function(result) {
            if (result.data) {
                this.setState({processingResult: {result:"OK", message: result.data.result}});
            }
            else {
                this.setState({processingResult: {result:"error", message: result.stack}});
            }
        this.setState({processing: false});
        }.bind(this));
    },
    renderOrder: function () {

        return (
            <pure.Grid>
                <pure.Col className="table-header">
                    <pure.Col md={"1-3"} >
                        Campaign name
                    </pure.Col>
                    <pure.Col md={"1-3"} >
                        Your package
                    </pure.Col>
                    <pure.Col md={"1-6"} >
                        Quantity
                    </pure.Col>
                    <pure.Col md={"1-6"} >
                        Price
                    </pure.Col>
                </pure.Col>
                {this.renderOrderItems()}
            </pure.Grid>
            );

    },
    renderOrderItems() {
            return this.props.campaigns.map(function(row, i) {
                var reward = row.get("rewards").slice(this.props.params.reward_index,this.props.params.reward_index+1).values().next();
                    return (
                        <pure.Col>
                            <pure.Col md={"1-3"}>
                            <b>{row.get("title")}</b><br/>
                            {row.get("text")}
                            </pure.Col>
                            <pure.Col md={"1-3"}>
                               {reward.value.get("description")}
                            </pure.Col>
                            <pure.Col md={"1-6"}>
                               1
                            </pure.Col>
                            <pure.Col md={"1-6"}>
                                {reward.value.get("price")} Eur
                            </pure.Col>
                        </pure.Col>
                    );
                }.bind(this));
    },
    render: function () {
        return (
            <div className="av-order">
                <pure.Grid>
                    <pure.Col>
                        <p>{"Your order:"}</p>
                        {this.renderOrder()}
                    </pure.Col>
                    <pure.Col md={"2-3"} gutter={0}>
                        <pure.Col>
                            <p>{"Your shipping address:"}</p>
                            {this.renderShippingAddress()}
                        </pure.Col>
                    </pure.Col>
                    <pure.Col md={"1-3"}>
                        <p>{"Payment information:"}</p>
                        {this.renderPaymentInformation()}
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});
module.exports = Order;
