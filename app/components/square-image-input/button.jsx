var React = require("react");

var components   = require("components");
var EditingModal = require("./editing-modal.jsx");
var s3           = require("lib/s3");

var Button = React.createClass({
    propTypes: {
        src: React.PropTypes.string,
        size: React.PropTypes.number,
        circle: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },
    pickFile: function () {
        this.refs.file.getDOMNode().click();
    },
    onFileAvailable: function (evt) {
        var file = evt.target.files[0];
        this.refs.editingModal.edit(file);
    },
    notifyProgress: function (loaded, total) {
        console.log(loaded, total);
    },
    onEditEnd: function (file) {
        s3.upload(file, {
            notify: this.notifyProgress
        }).then(this.props.onChange).fail(function (err) {
            console.log(err);
        });
    },
    render: function() {
        return (
            <span>
                <components.SquareImage
                    src={this.props.src}
                    size={this.props.size}
                    circle={this.props.circle}
                    onClick={this.pickFile}
                />
                <input
                    ref="file"
                    style={{display: "none"}}
                    type="file"
                    onChange={this.onFileAvailable}
                />
                <EditingModal
                    ref="editingModal"
                    onEditEnd={this.onEditEnd}
                />
            </span>
        );
    }
});

module.exports = Button;
