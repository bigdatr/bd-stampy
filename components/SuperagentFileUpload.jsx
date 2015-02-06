/** @jsx React.DOM */
var React = require('react');
var request = require('superagent');

var Button = require('./Button');

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
        });
    },
    onChange() {
        var input = this.refs.input.getDOMNode();
        this.setState({files: input.files});
    },
    onUpload() {
        this.postFile(this.state.files[0]);
    },
    render() {
        console.log(this.props);
        return (
            <div className="FileUpload row">
                {this.renderButton()}
                <input
                    className="l-70" 
                    ref="input"
                    type="file" 
                    name={this.props.name}
                    onChange={this.onChange}
                />
            </div>

        );
    },
    renderButton() {
        if(this.state.files) {
            return <Button className="right l-30" onClick={this.onUpload}>Upload</Button>;
        }
    }
});

module.exports = FileUpload;