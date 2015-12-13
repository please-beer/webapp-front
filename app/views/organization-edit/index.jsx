var R      = require("ramda");
var React  = require("react");
var t      = require("tcomb-form");

var components   = require("components");
var ceres        = require("lib/ceres");
var pure         = require("lib/pure");
var editAutosave = require("lib/edit-autosave");
var Router     = require("react-router");
var History     = Router.History;

var organizationType = t.struct({
    name: t.Str,
    logoUrl: t.Str,
    location: t.Str,
    description: t.Str,
    website: t.Str
});
var organizationOptions = {
    fields: {
        description: {
            type: "textarea"
        },
        logoUrl: {
            factory: components.SquareImageInput,
            config: {
                size: 200,
                circle: true
            }
        }
    }
};

var OrganizationEdit = React.createClass({
    mixins: [
        History,
        editAutosave.getMixin("organizations", organizationType, organizationOptions)
    ],
    createCampaign: function () {
        var self = this;
        ceres.getCollection("campaigns").insert({
            organizationId: this.props.params._id
        }).remote.then(function (_id) {
            self.context.router.transitionTo("campaignEdit", {
                _id: _id
            });
        });
    },
    componentWillMount: function () {
        console.log(this.props.params._id);
        ceres.subscribe("organizations:byId", this.props.params._id);
        ceres.subscribe("campaigns:byOrganization", this.props.params._id);
    },
    renderCampaigns: function () {
        var _id = this.props.params._id;
        return this.props.campaigns
            .filter(function (campaign) {
                return campaign.get("organizationId") === _id;
            })
            .map(function (campaign) {
                return (
                    <components.CampaignCard
                        key={campaign.get("_id")}
                        campaign={campaign}
                        linkTo={"edit"}
                    />
                );
            })
            .toList();
    },
    render: function () {
        return (
            <div className="av-organization-edit">
                <pure.Grid>
                    <pure.Col md={"2-3"} gutter={0}>
                        <pure.Col md={"1-2"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"logoUrl"}
                            />
                        </pure.Col>
                        <pure.Col md={"1-2"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"name location website"}
                            />
                        </pure.Col>
                        <pure.Col>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"description"}
                            />
                        </pure.Col>
                    </pure.Col>
                    <pure.Col md={"1-3"}>
                        <p>{"Campaigns:"}</p>
                        {this.renderCampaigns()}
                        <p>
                            <button onClick={this.createCampaign}>
                                {"New"}
                            </button>
                        </p>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = OrganizationEdit;
