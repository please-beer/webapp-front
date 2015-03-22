var React = require("react");

module.exports = {
    contextTypes: {
        router: React.PropTypes.func.isRequired
    },
    getParams: function () {
        // WARNING: subject to change
        return this.context.router.getCurrentParams();
    }
};
