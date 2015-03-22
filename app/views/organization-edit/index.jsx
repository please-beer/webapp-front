var R      = require("ramda");
var React  = require("react");
var t      = require("tcomb-form");

var components   = require("components");
var ceres        = require("lib/ceres");
var pure         = require("lib/pure");
var editAutosave = require("lib/edit-autosave");
var RouterMixin  = require("lib/router-mixin");

var organizationType = t.struct({
    name: t.Str,
    logoUrl: t.Str,
    location: t.Str,
    description: t.Str,
    website: t.Str
});
var organizationOptions = {
    fields: {
        name: {
        },
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
        RouterMixin,
        editAutosave.getMixin("organizations", organizationType, organizationOptions)
    ],
    createCampaign: function () {
        var self = this;
        ceres.getCollection("campaigns").insert({
            organizationId: self.getParams()._id
        }).remote.then(function (_id) {
            self.context.router.transitionTo("campaignEdit", {
                _id: _id
            });
        });
    },
    componentWillMount: function () {
        ceres.subscribe("organizations:byId", this.getParams()._id);
        ceres.subscribe("campaigns:byOrganization", this.getParams()._id);
    },
    renderCampaigns: function () {
        var _id = this.getParams()._id;
        return this.props.campaigns
            .filter(function (campaign) {
                return campaign.get("organizationId") === _id;
            })
            .map(function (campaign) {
                return (
                    <components.CampaignCard
                        key={campaign.get("_id")}
                        campaign={campaign}
                        linkTo={"Edit"}
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
