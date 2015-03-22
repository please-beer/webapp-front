var React      = require("react");
var Remarkable = require("remarkable");

var markdown = new Remarkable({
    xhtmlOut: false,
    linkify: true
});

var Markdown = React.createClass({
    propTypes: {
        string: React.PropTypes.string
    },
    render: function () {
        var innerHtml = {
            __html: markdown.render(this.props.string || "")
        };
        return (
            <div className="ac-markdown" dangerouslySetInnerHTML={innerHtml}></div>
        );
    }
});

module.exports = Markdown;
