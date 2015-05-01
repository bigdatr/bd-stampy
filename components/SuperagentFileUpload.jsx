/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');

var Button = require('./Button');
var ProgressBar = require('./ProgressBar');

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
        require('../mixins/FormMixin'),
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        onComplete: React.PropTypes.func,
        onProgress: React.PropTypes.func,
        name: React.PropTypes.string.isRequired
    },
    getInitialState() {
        return {
            uploading: false,
            percentage: 0
        };
    },
    postFile(file) {
        return new Promise((resolve, reject) => {
            var req = request
                .post(this.props.url)
                .attach(this.props.name, file, file.name)
                .end((err, response) => {
                    if (response.ok) {
                        resolve(response.body);
                    } else {
                        reject(response.body);
                    }
                });

            req.on('progress', this.onProgress);

        });
    },
    onChange(e) {
        var input = this.refs.input.getDOMNode();
        this.setState({
            files: input.files,
            uploading: false,
            percentage: 0,
            error: null
        });
        if(this.props.onChange) {
            this.props.onChange(e);
        }
    },
    onUpload() {
        this.setState({
            uploading: true,
            percentage: 0,
            error: null
        });
        this.postFile(this.state.files[0]).then(
            (data) => this.onSuccess(data),
            (error) => this.onError(error)
        );
    },
    onSuccess(data) {
        this.setState({uploading: false});
        if(this.props.onSuccess) {
            this.props.onSuccess(data);
        }
    },
    onError(error) {
        this.setState({uploading: false});
        if(this.props.onError) {
            this.props.onError(error);
        }
    },
    onProgress(e) {
        var decimal = (e.loaded / e.total);

        var details = {
            loaded: e.loaded,
            total: e.total,
            decimal: decimal,
            percentage: Math.round((decimal * 100) * 100) / 100
        };

        this.setState(details);

        if(this.props.onProgress) {
            this.props.onProgress(e, details);
        }
    },
    render() {
        var classes = this.ClassMixin_getClass('FileUpload')
            .is(this.state.files, 'chosenFile')
        ;

        return (
            <div className={classes.className}>
                {this.renderButton()}
                <input
                    className="FileUpload_input"
                    ref="input"
                    type="file"
                    name={this.props.name}
                    onChange={this.onChange}
                />
                {this.renderProgress()}
                {this.renderFileInformation()}
            </div>

        );
    },
    renderButton() {
        if(this.state.files) {
            return <Button className="FileUpload_button" onClick={this.onUpload}>Upload</Button>;
        }
    },
    renderProgress() {
        if(this.state.percentage !== 0) {
            return <ProgressBar className="FileUpload_progress" value={this.state.percentage} />;
        }
    },
    renderFileInformation() {
        var files = this.state.files;
        if(files) {
            return <div className="FileUpload_meta">
                <div className="FileUpload_meta_name">{files[0].name}</div>
                <div className="FileUpload_meta_size">{this.renderLoaded()}{humanFileSize(files[0].size)}</div>
                <div className="FileUpload_meta_type">{files[0].type}</div>
            </div>
        }
    },
    renderLoaded() {
        if(this.state.loaded) {
            return humanFileSize(this.state.files[0].size * this.state.decimal)+ ' / ';
        }
    }
});

module.exports = FileUpload;
