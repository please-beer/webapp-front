var R     = require("ramda");
var React = require("react");
var t     = require("tcomb-form");

var components   = require("components");
var pure         = require("lib/pure");
var editAutosave = require("lib/edit-autosave");

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
        }
    }
};

var OrganizationEdit = React.createClass({
    mixins: [
        editAutosave.getMixin("organizations", organizationType, organizationOptions)
    ],
    render: function () {
        return (
            <div className="av-organization-edit">
                <pure.Grid>
                    <pure.Col md={"2-3"}>
                        <components.AutosaveForm
                            {...this.getBaseAutosaveFormProps()}
                        />
                    </pure.Col>
                </pure.Grid>
            </div>
        );
    }
});

module.exports = OrganizationEdit;
