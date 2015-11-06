var R     = require("ramda");
var React = require("react");
var ReactDOM = require("react-dom");
var t     = require("tcomb-form");

var components = require("components");
var ceres      = require("lib/ceres");
var pure       = require("lib/pure");

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
                        linkTo={"Edit"}
                    />
                );
            })
            .toList();
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
                    </pure.Col>
                    <pure.Col md={"1-3"}>
                        <p>{"Organizations:"}</p>
                        {this.renderOrganizations()}
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});
module.exports = Profile;
