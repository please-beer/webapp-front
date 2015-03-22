var R     = require("ramda");
var React = require("react");
var t     = require("tcomb-form");

var components   = require("components");
var pure         = require("lib/pure");
var editAutosave = require("lib/edit-autosave");

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
        editAutosave.getMixin("campaigns", campaignType, campaignOptions)
    ],
    launch: function () {
        console.warn("TODO - implement");
        console.log("3... 2... 1... Launch!");
    },
    render: function () {
        return (
            <div className="av-campaign-edit">
                <pure.Grid>
                    <pure.Col md={"2-3"}>
                        <components.AutosaveForm
                            {...this.getBaseAutosaveFormProps()}
                            fields={"title"}
                        />
                        <button onClick={this.launch}>
                            launch
                        </button>
                    </pure.Col>
                    <pure.Col md={"1-3"}>
                        <components.AutosaveForm
                            {...this.getBaseAutosaveFormProps()}
                            fields={"goal currency startDate endDate"}
                        />
                    </pure.Col>
                    <pure.Col md={"2-3"}>
                        <components.AutosaveForm
                            {...this.getBaseAutosaveFormProps()}
                            fields={"text"}
                        />
                    </pure.Col>
                    <pure.Col md={"1-3"}>
                        <components.AutosaveForm
                            {...this.getBaseAutosaveFormProps()}
                            fields={"rewards"}
                        />
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = CampaignEdit;
