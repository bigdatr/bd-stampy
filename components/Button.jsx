import React, { Component, PropTypes } from 'react';
import componentClassNames from '../utils/ComponentClassNames';

class Button extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked
        };
    }

    getDOMComponent() {
        if(this.props.href){
            return React.DOM.a;
        }
        return React.DOM[this.props.component];
    }

    handleClick(e) {
        if(this.props.disabled) {
            return false;
        }

        var state;
        if(this.props.toggle) {
            state = { checked: !this.state.checked };
            this.setState(state);
        }

        if(this.props.onClick) {
            this.props.onClick(e, state);
        }
    }

    render() {
        const {
            color,
            type,
            disabled,
            toggle,
            children,
            className
        } = this.props;

        const ButtonComponent = this.getDOMComponent();

        // add modifiers based on props
        const isGrey = (toggle && !this.state.checked) || disabled;

        var additionalModifiers = { grey: isGrey };

        if(color && !isGrey) {
            additionalModifiers[color] = true;
        }

        // build props
        const props = Object.assign({}, this.props, {
            className: componentClassNames(this.props, 'Button', additionalModifiers),
            onClick: this.handleClick.bind(this),
            type
        });

        return ButtonComponent(props, children);
    }
}

Button.propTypes = {
    color: PropTypes.string, // used the same way as modifier, kept for legacy reasons
    component: PropTypes.string, // string specifying type of HTML element to create. Has some validation issues
    onClick: PropTypes.func, // callback function when button is clicked, provides one argument (mouse event)
    toggle: PropTypes.bool, // set to true to use this as a toggle - button will keep its own state and appear greyed out when not checked
    type: PropTypes.string, // <button> type attribute
    checked: PropTypes.bool, // only used when toggle is true
    disabled: PropTypes.bool, // button will be disabled and appear greyed out
    href: PropTypes.string // if provided, this button will be a link that appears as a button
};

Button.defaultProps = {
    component: 'button',
    toggle: false,
    type: 'button',
    checked: false,
    disabled: false
};

export default Button;
