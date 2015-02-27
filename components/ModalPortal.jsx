/** @jsx React.DOM */
/* global document, HTMLElement */

var React = require('react');

var ClassMixin = require('../mixins/ClassMixin.jsx');

// TODO: This is due to a limitation of react-modal. Hopefully they fix it soon!
HTMLElement = typeof HTMLElement === 'undefined' ? function(){} : HTMLElement;

var ReactModal = require('react-modal');


if (typeof window !== 'undefined') {
    ReactModal.setAppElement(document.body);
    // ReactModal.injectCSS();
}

var Modal = React.createClass({
    displayName: 'Modal',
    mixins: [ClassMixin],
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        transitionName: React.PropTypes.oneOf(['fade']),
        transitionDuration: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
              transitionName: 'fade',
              transitionDuration: 350
        };
    },
    getInitialState: function () {
        return {
            modalIsMounted: true  
        };
    },
    componentDidUpdate: function (prevProps) {
        var _this = this;

        if (this.props.isOpen && this.state.modalIsMounted) {
            // Show modal
            this.setState({modalIsMounted: false});
        }
        else if (prevProps.isOpen && !this.props.isOpen) {
            // Hide modal
            setTimeout(function() {
                if (_this.isMounted()) {
                    _this.setState({modalIsMounted: true});
                }
            }, this.props.transitionDuration + 16.6);
        }
    },
    render: function() {
        if (this.state.modalIsMounted) {
            // Need this to ensure that the modal is removed from the DOM
            // and CSS transitions will work correctly
            return null;
        }

        var modalClasses = this.ClassMixin_getClass()
                                .modifier(this.props.transitionName);

        return (
            <ReactModal     className={modalClasses.className}
                            isOpen={this.props.isOpen}
                            onRequestClose={this.props.onRequestClose}
                            closeTimeoutMS={this.props.transitionDuration}
                                >{this.props.children}</ReactModal>
        );
    }
});

module.exports = Modal;