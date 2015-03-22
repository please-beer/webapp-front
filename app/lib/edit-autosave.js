var React = require("react");

exports.getMixin = function (collectionName, type, options) {
    return {
        getBaseAutosaveFormProps: function () {
            return {
                collection: this.props[collectionName],
                collectionName: collectionName,
                type: type,
                itemId: this.getParams()._id,
                options: options
            };
        }
    };
};
