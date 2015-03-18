/* global document, HTMLElement */
HTMLElement = typeof HTMLElement === 'undefined' ? function(){} : HTMLElement;

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ClassMixin = require('../mixins/ClassMixin.jsx');

// TODO: This is due to a limitation of react-modal. Hopefully they fix it soon!

var ReactModal = require('react-modal');

if (typeof window !== 'undefined') {
    ReactModal.setAppElement(document.body);
    // ReactModal.injectCSS();
}

var Modal = React.createClass({
    displayName: 'Modal',
    mixins: [ClassMixin, PureRenderMixin],
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        transitionName: React.PropTypes.oneOf(['fade']),
        transitionDuration: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            transitionName: 'fade',
            transitionDuration: 480
        };
    },
    getInitialState: function () {
        return {
            loaded: false
        };
    },
    componentDidUpdate: function (prevProps) {
        if (!this.state.loaded && !prevProps.isOpen && this.props.isOpen) {
            this.setState({loaded: true});
        }
    },
    render: function() {
        if (!this.state.loaded && !this.props.isOpen) {
            return null;
        }

        var modalClasses = this.ClassMixin_getClass('Modal')
            .modifier(this.props.transitionName);

        return (
            <ReactModal
                className={modalClasses.className}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                closeTimeoutMS={this.props.transitionDuration}>
                {this.props.children}
            </ReactModal>
        );
    }
});

module.exports = Modal;
