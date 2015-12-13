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
                    name: t.Str,
                    address: t.list(t.struct({
                        firstName: t.Str,
                        lastName: t.Str,
                        address: t.Str,
                        postcode: t.Str,
                        country: t.Str,
                        state: t.Str,
                        mobileNumber: t.Str,
                        noteForDelivery: t.Str,
                        isDefault: t.Boolean
                    }))
                }),
            path: ["profile"],
            itemId: this.props.userId || "",
            options: {
                fields: {
                    pictureUrl: {
                        factory: components.SquareImageInput,
                        config: {
                            size: 200,
                            circle: true
                        }
                    },
                    address: {
                        item: {
                            fields: {
                                noteForDelivery: {
                                    type: "textarea"
                                }
                            }
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
        console.log(process.env.NODE_ENV);
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
                <pure.Col md={"3-5"}>
                    <components.AutosaveForm
                        {...this.getBaseAutosaveFormProps()}
                        fields={"address"}
                    />
                </pure.Col>
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
                            { this.state.shippingFormChanged ? <button onClick={this.saveShippingAddress}>Save changes</button> : null }
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
