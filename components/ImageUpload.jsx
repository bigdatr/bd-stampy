
/* global FileReader */

var React = require('react');

var FileUpload = require('./FileUpload.jsx');
var Img = require('./Img.jsx');

var ImageUpload = React.createClass({
    displayName: 'ImageUpload',
    propTypes: {
        name: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        preview: React.PropTypes.bool,
        onComplete: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            name: null,
            url: null,
            preview: false
        };
    },
    getInitialState: function() {
        return {
            image_preview: null
        };
    },
    onAddFile: function(e, file) {
        if (this.props.preview) {
            this.fetchPreview(file);
        }

        if (this.props.onAddFile) {
            this.props.onAddFile(e, file);
        }
    },
    onComplete: function(res, xhr) {
        // this.setState({image_preview: null});

        if (this.props.onComplete) {
            this.props.onComplete(res, xhr);
        }
    },
    fetchPreview: function(file) {
        var _this = this;
        var reader = new FileReader();

        reader.onload = function(e) {
            _this.setState({image_preview: e.target.result});
        };

        reader.readAsDataURL(file);
    },
    render: function() {
        var preview;

        if (this.state.image_preview) {
            preview = <Img src={this.state.image_preview} alt="Preview of image to upload" className="ImageUpload_preview l-100" />;
        }

        return (
            <div className="ImageUpload">
                {preview}
                <FileUpload     name={this.props.name}
                                url={this.props.url}
                                onAddFile={this.onAddFile}
                                onComplete={this.onComplete} />
            </div>
        );
    }
});

module.exports = ImageUpload;
