/** @jsx React.DOM */
/**
 * Input
 *
 * @param   {String} example  <p> <Input value="Valid Text Input" /> <Input value="Invalid Text Input" isValid={false} /> </p>
 */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var Label = require('../components/Label.jsx');
var Icon = require('../components/Icon.jsx');

var Input = React.createClass({
    displayName: 'Input',
    mixins: [ClassMixin],
    propTypes: {
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        readOnly: React.PropTypes.bool,
        isValid: React.PropTypes.bool,
        label: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        discreteValue: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            grey: false,
            isValid: true,
            readOnly: false,
            type: 'text',
            closeIcon: <Icon  name="cross" size="small" ></Icon>
        };
    },
    componentDidMount: function () {
        if(this.props.focus) {
            this.focusInput();
        }
    },
    componentWillUpdate: function (nextProps) {
        if(nextProps.focus && this.props.focus !== nextProps.focus) {
            this.focusInput();
        }
    },
    getDetails: function() {
        return {
            key: this.props.name,
            value: this.refs.input.getDOMNode().value
        };
    },
    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e, this.getDetails());
        }
    },
    onFocus: function(e) {
        if (this.props.onFocus) {
            this.props.onFocus(e, this.getDetails());
        }
    },
    onBlur: function(e) {
        if (this.props.onBlur) {
            this.props.onBlur(e, this.getDetails());
        }
    },
    onKeyUp: function(e) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e, this.getDetails());
        }
        else if (e.keyCode === 27) {
            // Stop Esc key from closing modal's
            e.stopPropagation();
            this.getDOMNode().blur();
        }
    },
    onClearValue: function (e) {
        if (this.props.onChange) {
            this.props.onChange(e, {
                key: this.props.name,
                value: ''
            });
        }
    },
    focusInput: function () {
        this.refs.input.getDOMNode().focus();
    },
    renderClearButton() {
        var clearButton = null;
        if (this.props.discreteValue && this.props.value) {
            clearButton = (
                <button className="Input_clear" aria-label="clear" onClick={this.onClearValue}>{this.props.closeIcon}</button>
            );
        }

        return clearButton;
    },
    render: function() {
        var classes = this.ClassMixin_getClass()
            .add((this.props.isValid === false || this.props.error), 'is-error')
            .modifier(this.props.type)
        ;
        var disabled = this.props.disabled || false;

        var label, error;

        if (this.props.error) {
            error = <div className="Input_error">{this.props.error}</div>;
        }

        if (this.props.label) {
            label = <Label htmlFor={this.props.name}>{this.props.label}</Label>;
        }

        if (this.props.discreteValue) {
            classes.add(this.props.value, 'is-selected');
        }

        return (
            <div>
                {label}

                <div className="Input_wrapper">
                    <input
                        {...this.props}
                        disabled={disabled}
                        ref="input"
                        className={classes.className}
                        placeholder={this.props.placeholder}
                        readOnly={this.props.readOnly}
                        name={this.props.name}
                        type={this.props.type}
                        checked={this.props.checked}
                        onChange={this.onChange}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onKeyUp={this.onKeyUp}
                        onKeyDown={this.props.onKeyDown}
                        value={this.props.value}
                        tabIndex={(this.props.readOnly) ? -1 : this.props.tabIndex}
                        id={""+this.props.name}
                    />
                    {this.renderClearButton()}
                </div>
                {error}
            </div>
        );
    }

});

module.exports = Input;
