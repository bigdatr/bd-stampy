console.warn('Warning LightBox.jsx will be deprecated in the next minor version.');
var React = require('react');
var Modal = require('./Modal.jsx'),
    Button = require('./Button.jsx'),
    Loader = require('./Loader.jsx');

var LightBox = React.createClass({
    displayName: 'LightBox',
    propTypes: {
        src: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            isLoaded: false
        };
    },
    componentWillMount: function() {
        var img = new Image();
        img.onload = this.onLoad;
        img.onerror = this.onError;
        img.src = this.props.src;
    },

    onLoad: function() {
        this.setState({isLoaded: true});
    },
    onError: function() {
        console.error('::LightBox:Failed to load', this.props.src);
    },
    render: function() {
        return (
            <Modal ref="modal" onClose={this.props.onClose}>
                {this.state.isLoaded ? <img src={this.props.src} /> : <Loader />}
            </Modal>
        );
    }
});

module.exports = LightBox;
