/** @jsx React.DOM */

/**
 * Button
 *
 * @param {String} example  <div>
        <Button>Button</Button>
        <Button color="hero">Button</Button>
        <Button color="blue">Button</Button>
        <Button color="aqua">Button</Button>
        <Button color="green">Button</Button>
        <Button color="red">Button</Button>
        <Button color="grey">Button</Button>
    </div>
    <div>
        <Button isRound>B</Button>
        <Button color="hero" isRound>B</Button>
        <Button color="blue" isRound>B</Button>
        <Button color="aqua" isRound>B</Button>
        <Button color="green" isRound>B</Button>
        <Button color="red" isRound>B</Button>
        <Button color="grey" isRound>B</Button>
    </div>

 */
var React = require('react');
var _ = require('lodash');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Button = React.createClass({
    displayName: 'Button',
    mixins: [ClassMixin],
    propTypes: {
        color: React.PropTypes.string,
        component: React.PropTypes.string, //Has some validation issues
        onClick: React.PropTypes.func,
        toggle: React.PropTypes.bool,
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
        // Check for link
        if(this.props.href){
            this.props.component = React.DOM.a;
        }

        var classes = this.ClassMixin_getClass()
                            .modifier(this.props.color);


        if ((this.props.toggle && !this.state.checked) || this.props.disabled) {
            classes.modifier('grey');
        }

        var component = React.DOM[this.props.component];
        var props = _.defaults({
                className: classes.className,
                onClick: this.onClick,
                type: this.props.type
            }, this.props);

        return component(props, this.props.children);
    }
});

module.exports = Button;