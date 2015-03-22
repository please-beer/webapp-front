var React        = require("react");
var AvatarEditor = require("react-avatar-editor");

var components = require("components");
var utils      = require("lib/utils");

var EditingModal = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    propTypes: {
        onEditEnd: React.PropTypes.func
    },
    saveImage: function () {
        this.props.onEditEnd(
            utils.dataURLToFile(this.refs.editor.getImage())
        );
        this.setState({
            open: false
        });
    },
    setDataURLAndOpen: function (dataURL) {
        this.setState({
            imageDataURL: dataURL,
            open: true
        });
    },
    edit: function (file) {
        utils.fileToDataURL(file, this.setDataURLAndOpen);
    },
    getInitialState: function () {
        return {
            scale: "1",
            open: false
        };
    },
    render: function () {
        return (
            <components.Modal open={this.state.open}>
                <AvatarEditor
                    ref="editor"
                    image={this.state.imageDataURL}
                    width={512}
                    height={512}
                    border={50}
                    scale={parseFloat(this.state.scale)}
                />
                <br />
                <input
                    type="range"
                    valueLink={this.linkState("scale")}
                    min="1"
                    max="2"
                    step="0.01"
                />
                <br />
                <button onClick={this.saveImage}>
                    SAVE
                </button>
            </components.Modal>
        );
    }
});

module.exports = EditingModal;
