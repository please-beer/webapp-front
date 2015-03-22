var React = require("react");

exports.getMixin = function (collectionName, type, options) {
    return {
        contextTypes: {
            router: React.PropTypes.func.isRequired
        },
        getId: function () {
            // WARNING: subject to change
            return this.context.router.getCurrentParams()._id;
        },
        getBaseAutosaveFormProps: function () {
            return {
                collection: this.props[collectionName],
                collectionName: collectionName,
                type: type,
                itemId: this.getId(),
                options: options
            };
        }
    };
};
