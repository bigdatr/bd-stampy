/** @jsx React.DOM */
/*global XMLHttpRequest, FormData*/
var React = require('react');
var Button = require('./Button.jsx');

var FileUpload = React.createClass({
    displayName: 'FileUpload',
    propTypes: {
        name: React.PropTypes.string.isRequired, 
        url: React.PropTypes.string.isRequired,
        onClick: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        onComplete: React.PropTypes.func,
        onAddFile: React.PropTypes.func,
        label: React.PropTypes.string,
        autoupload: React.PropTypes.bool
        // list: React.PropTypes.element
    },
    getDefaultProps: function() {
        return {
            label: 'Add File',
            autoupload: false
        };
    },
    getInitialState: function() {
        return {
            file: null
        };
    },
    componentDidMount: function() {
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                var resp = JSON.parse(xhr.response);
                this.onComplete(resp);
            }
        }.bind(this);

        xhr.upload.addEventListener('progress', this.onProgress, false);

        this.xhr = xhr;
    },
    componentWillUnmount: function() {
        this.xhr.upload.removeEventListener('progress', this.onProgress, false);
        this.xhr = null;
    },
    uploadFile: function(file) {
        file = file || this.state.file;
        var data = new FormData();
        data.append(this.props.name, file);

        this.xhr.open('POST', this.props.url);
        this.xhr.send(data);
    },
    onProgress: function(e) {
        if (this.props.onProgress) {
            var percentage = (e.loaded / e.total) * 100;

            var details = {
                loaded: e.loaded,
                total: e.total,
                percentage: Math.round(percentage * 100) / 100
            };

            this.props.onProgress(e, details);
        }
    },
    onComplete: function(resp) {
        if (this.props.onComplete) {
            this.props.onComplete(resp);
        }
    },
    onChange: function(e) {
        var files = this.refs.files.getDOMNode();
        var file = files.files[0];
        var preventUpload;

        if (this.props.onAddFile) {
            preventUpload = this.props.onAddFile(e, file);
        }

        this.setState({file: file});

        if (this.props.autoupload && preventUpload !== false) {
            this.uploadFile(file);
        }
    },
    onUploadClick: function() {
        this.uploadFile();
    },
    render: function() {
        var classes = 'FileUpload InfoBox';

        var uploadButton;

        if (!this.props.autoupload && this.state.file) {
            uploadButton = <Button onClick={this.onUploadClick}>Upload!</Button>;
        }

        return (
            <div className={classes} onClick={this.props.onClick}>
                <input className={classes + "_file"} ref="files" type="file" onChange={this.onChange} />
                {uploadButton}
            </div>
        );
    }
});

module.exports = FileUpload;