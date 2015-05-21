

var React = require('react');
var _ = require('lodash');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Button = React.createClass({
    displayName: 'Button',
    mixins: [ClassMixin],
    propTypes: {

        /**
         * Color name string
         */
        color: React.PropTypes.string,
        component: React.PropTypes.string, //Has some validation issues
        onClick: React.PropTypes.func,
        toggle: React.PropTypes.bool,
        type: React.PropTypes.string,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            component: 'button',
            toggle: false,
            type: 'button',
            checked: false,
            disabled: false
        };
    },
    getInitialState: function() {
        return {
            checked: this.props.checked
        };
    },
    getDOMComponent: function() {
        if (this.props.href){
            return React.DOM.a;
        }

        return React.DOM[this.props.component];
    },
    onClick: function(e) {
        if (this.props.disabled) {
            return false;
        }

        var state;

        if (this.props.toggle) {
            state = { checked: !this.state.checked };
            this.setState(state);
        }

        if (this.props.onClick) {
            this.props.onClick(e, state);
        }
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Button').modifier(this.props.color);

        if ((this.props.toggle && !this.state.checked) || this.props.disabled) {
            classes.modifier('grey');
        }

        var ButtonComponent = this.getDOMComponent();

        var props = _.defaults({
                className: classes.className,
                onClick: this.onClick,
                type: this.props.type,
            }, this.props);

        return ButtonComponent(props, this.props.children);
    }
});

module.exports = Button;
