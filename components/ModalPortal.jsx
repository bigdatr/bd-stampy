/* global document, HTMLElement */
HTMLElement = typeof HTMLElement === 'undefined' ? function(){} : HTMLElement;

var React = require('react');
import PureRenderMixin from 'react-addons-pure-render-mixin';
var ClassMixin = require('../mixins/ClassMixin.jsx');

// TODO: This is due to a limitation of react-modal. Hopefully they fix it soon!

var ReactModal = require('react-modal');

if (typeof window !== 'undefined') {
    ReactModal.setAppElement(document.body);
    // ReactModal.injectCSS();
}

var styleReset = {
    overlay: {
        backgroundColor : null
    },
    content: {
        position                : null,
        top                     : null,
        left                    : null,
        right                   : null,
        bottom                  : null,
        border                  : null,
        background              : null,
        overflow                : null,
        WebkitOverflowScrolling : null,
        borderRadius            : null,
        outline                 : null,
        padding                 : null
    }
}

var Modal = React.createClass({
    displayName: 'Modal',
    mixins: [ClassMixin, PureRenderMixin],
    propTypes: {
        isOpen: React.PropTypes.bool.isRequired,
        onRequestClose: React.PropTypes.func,
        transitionName: React.PropTypes.oneOf(['fade', 'slide']),
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
    render: function() {
        if (!this.state.loaded) {
            return null;
        }
        var modalClasses = this.createClassName('Modal')
            .modifier(this.props.transitionName);

        return (
            <ReactModal
                className={modalClasses.className}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                closeTimeoutMS={this.props.transitionDuration}
                style={styleReset}
                >
                {this.props.children}
            </ReactModal>
        );
    }
});

module.exports = Modal;
