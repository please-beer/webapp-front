var R     = require("ramda");
var React = require("react");
var ReactDOM = require("react-dom");
var t     = require("tcomb-form");

var components = require("components");
var ceres      = require("lib/ceres");
var pure       = require("lib/pure");

var Router     = require("react-router");
var History     = Router.History;


var Profile = React.createClass({
    getBaseAutosaveFormProps: function () {
        return {
            collection: this.props.users,
            collectionName: "users",
            type: t.struct({
                pictureUrl: t.Str,
                username: t.Str,
                name: t.Str
            }),
            itemId: this.props.userId || "",
            path: ["profile"],
            options: {
                fields: {
                    pictureUrl: {
                        factory: components.SquareImageInput,
                        config: {
                            size: 200,
                            circle: true
                        }
                    }
                }
            }
        };
    },
    getInitialState: function() {
        return {
            shippingFormChanged: false
        }
    },
    componentWillMount: function () {
        ceres.subscribe("organizations:owned");
    },
    renderOrganizations: function () {
        var _id = this.props.userId;
        return this.props.organizations
            .filter(function (organization) {
                return organization.get("owner") === _id;
            })
            .map(function (organization) {
                return (
                    <components.OrganizationCard
                        key={organization.get("_id")}
                        organization={organization}
                        linkTo={"edit"}
                    />
                );
            })
            .toList();
    },
    shippingFormChange: function() {    
        this.setState({shippingFormChanged: true});
    },
    renderShippingAddress: function () {

        return (
            <pure.Grid>
                <pure.Col><label htmlFor="shipping-first-name">First Name: </label><input onChange={this.shippingFormChange} id="shipping-first-name" /></pure.Col>
                <pure.Col><label htmlFor="shipping-last-name">Last Name: </label><input onChange={this.shippingFormChange} id="shipping-last-name" /></pure.Col>
                <pure.Col><label htmlFor="shipping-address">Address: </label><input onChange={this.shippingFormChange} id="shipping-address" /></pure.Col>
                <pure.Col><label htmlFor="shipping-postcode">Postcode: </label><input onChange={this.shippingFormChange} id="shipping-postcode" /></pure.Col>
                <pure.Col><label htmlFor="shipping-country">Country: </label><input onChange={this.shippingFormChange} id="shipping-country" /></pure.Col>
                <pure.Col><label htmlFor="shipping-state">State: </label><input onChange={this.shippingFormChange} id="shipping-state" /></pure.Col>
                <pure.Col><label htmlFor="shipping-mobile-number">Mobile number: </label><input onChange={this.shippingFormChange} id="shipping-mobile-number" /></pure.Col>
                <pure.Col><label htmlFor="shipping-note-of-delivery">Note fo delivery: </label><input onChange={this.shippingFormChange} id="shipping-note-of-delivery" /></pure.Col>
            </pure.Grid>
            );

    },
    createOrganization: function () {
        var self = this;
        ceres.getCollection("organizations").insert({
            userID: this.props.params._id
        }).remote.then(function (_id) {
            this.history.pushState(null,"/organization" +"/"+_id+"/edit/");
        }, function (error) {
            console.log(error);
        });
    },
    saveShippingAddress: function () {


    },
    render: function () {
        return (
            <div className="av-profile">
                <pure.Grid>
                    <pure.Col md={"2-3"} gutter={0}>
                        <pure.Col md={"2-5"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"pictureUrl"}
                            />
                        </pure.Col>
                        <pure.Col md={"3-5"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"name username"}
                            />
                        </pure.Col>
                        <pure.Col>
                            <p>{"Your shipping address:"}</p>
                            {this.renderShippingAddress()}
                            { this.state.shippingFormChanged ? <span onClick={this.saveShippingAddress}>Save changes</span> : null }
                        </pure.Col>
                    </pure.Col>
                    <pure.Col md={"1-3"}>
                        <p>{"Organizations:"}</p>
                        {this.renderOrganizations()}
                            <button onClick={this.createOrganization}>
                                {"New"}
                            </button>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});
module.exports = Profile;
