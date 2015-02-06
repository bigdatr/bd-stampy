/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');

var Button = require('./Button');

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(1)+' '+units[u];
}

var FileUpload = React.createClass({
    displayName: 'FileUpload',
    mixins: [
        require('../mixins/FormMixin')
    ],
    propTypes: {
        onComplete: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        name: React.PropTypes.string.isRequired
    },
    postFile(file) {
        return new Promise((resolve, reject) => {
            request
                .post(this.props.url)
                .attach(this.props.name, file, file.name)
                .end((response) => {
                    if (response.ok) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                });

            console.log(request);
        });
    },
    onChange() {
        var input = this.refs.input.getDOMNode();
        this.setState({files: input.files});
    },
    onUpload() {
        this.postFile(this.state.files[0]).then(
            (data) => this.onSuccess(data),
            (error) => this.onError(error),
            (progress) => this.onProgress(progress)
        );
    },
    onSuccess(data) {
        if(this.props.onSuccess) {
            this.props.onSuccess(data);
        }
    },
    onError(error) {
        if(this.props.onError) {
            this.props.onError(error);
        }
    },
    onProgress(e) {
        if(this.props.onProgress) {
            var percentage = (e.loaded / e.total) * 100;

            var details = {
                loaded: e.loaded,
                total: e.total,
                percentage: Math.round(percentage * 100) / 100
            };

            this.props.onProgress(e, details);
        }
    },
    render() {
        return (
            <div className="FileUpload">
                {this.renderButton()}
                <input
                    className="l-70" 
                    ref="input"
                    type="file" 
                    name={this.props.name}
                    onChange={this.onChange}
                />
                {this.renderFileInformation()}
            </div>

        );
    },
    renderButton() {
        if(this.state.files) {
            return <Button className="right l-30" onClick={this.onUpload}>Upload</Button>;
        }
    },
    renderFileInformation() {
        var files = this.state.files;
        if(files) {
            return <div className="FileUpload_meta">
                <div className="FileUpload_meta_name">{files[0].name}</div>
                <div className="FileUpload_meta_size">{humanFileSize(files[0].size)}</div>
                <div className="FileUpload_meta_type">{files[0].type}</div>
            </div>
        }
    }
});

module.exports = FileUpload;