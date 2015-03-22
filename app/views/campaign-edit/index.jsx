var R     = require("ramda");
var React = require("react");
var t     = require("tcomb-form");

var components   = require("components");
var pure         = require("lib/pure");
var ceres        = require("lib/ceres");
var editAutosave = require("lib/edit-autosave");
var RouterMixin  = require("lib/router-mixin");

var dateTransformer = {
    // Converts timestamp to datestring
    format: function (timestamp) {
        return timestamp && new Date(timestamp).toISOString().slice(0, 10);
    },
    // Converts datestring to timestamp
    parse: function (datestring) {
        return new Date(datestring).getTime();
    }
};
var campaignType = t.struct({
    title: t.Str,
    text: t.Str,
    imageUrl: t.Str,
    startDate: t.Num,
    endDate: t.Num,
    goal: t.Num,
    currency: t.enums.of(["EUR", "USD"]),
    rewards: t.list(t.struct({
        price: t.Num,
        availableSupply: t.Num,
        description: t.Str
    }))
});
var campaignOptions = {
    fields: {
        text: {
            type: "textarea"
        },
        imageUrl: {
            factory: components.SquareImageInput,
            config: {
                size: 200
            }
        },
        startDate: {
            type: "date",
            transformer: dateTransformer
        },
        endDate: {
            type: "date",
            transformer: dateTransformer
        },
        goal: {
            type: "number"
        },
        rewards: {
            disableOrder: true,
            item: {
                fields: {
                    description: {
                        type: "textarea"
                    }
                }
            }
        }
    }
};

var CampaignEdit = React.createClass({
    mixins: [
        RouterMixin,
        editAutosave.getMixin("campaigns", campaignType, campaignOptions)
    ],
    launch: function () {
        ceres.getCollection("campaigns").update(
            this.getParams()._id,
            {public: true}
        );
    },
    componentWillMount: function () {
        ceres.subscribe("campaigns:byId", this.getParams()._id);
    },
    renderPublishButton: function () {
        return (
            this.props.campaigns.getIn([this.getParams()._id, "public"]) ?
            null :
            <button onClick={this.launch}>Launch</button>
        );
    },
    render: function () {
        return (
            <div className="av-campaign-edit">
                <pure.Grid>
                    <pure.Col md={"2-3"} gutter={0}>
                        <pure.Col md={"2-5"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"imageUrl"}
                            />
                        </pure.Col>
                        <pure.Col md={"3-5"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"title"}
                            />
                            <br />
                            {this.renderPublishButton()}
                        </pure.Col>
                        <pure.Col md={"1-1"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"text"}
                            />
                        </pure.Col>
                    </pure.Col>
                    <pure.Col md={"1-3"} gutter={0}>
                        <pure.Col md={"1-1"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"goal currency startDate endDate"}
                            />
                        </pure.Col>
                        <pure.Col md={"1-1"}>
                            <components.AutosaveForm
                                {...this.getBaseAutosaveFormProps()}
                                fields={"rewards"}
                            />
                        </pure.Col>
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = CampaignEdit;
