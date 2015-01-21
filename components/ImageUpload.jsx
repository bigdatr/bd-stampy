/** @jsx React.DOM */
/* global FileReader */

var React = require('react');

var FileUpload = require('./FileUpload.jsx');
var Img = require('./Img.jsx');

var ImageUpload = React.createClass({
    displayName: 'ImageUpload',
    propTypes: {
        name: React.PropTypes.string.isRequired,
        url: React.PropTypes.string.isRequired,
        preview: React.PropTypes.bool
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
    onComplete: function() {
        this.setState({image_preview: null});

        console.log('image upload complete');
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
            preview = <Img src={this.state.image_preview} className="l-100" />;
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