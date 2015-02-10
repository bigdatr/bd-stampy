
/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
// require('../../../../client/sass/StampyUI/modules/_ToggleBox.scss');

var ToggleBox = React.createClass({
    displayName: 'ToggleBox',
    mixins: [ClassMixin],
    propTypes: {
        onClick: React.PropTypes.func,
        toggle: React.PropTypes.bool,
        checked: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        name: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            checked: false,
            disabled: false,
            name: null
        };
    },
    getInitialState: function() {
        return {
            checked: this.props.checked,
            focused: false
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({checked: nextProps.checked});
    },
    onClick: function(e) {
        if (!this.props.disabled) {
            var state = { checked: !this.state.checked };
            this.setState(state);

            if (this.props.onClick) {
                console.warn('ToggleBox', 'onClick will be deprecated. Use onChange instead');
                this.props.onClick(e, state);
            }
            else if (this.props.onChange) {
                this.props.onChange(e, state);
            }
        }
    },
    onFocus: function () {
        this.setState({focused: true});
    },
    onBlur: function () {
        this.setState({focused: false});
    },
    onChange: function() {
        // Need to stub this so react warnings go. Check implementation in onClick
    },
    render: function() {
        var classes = this.ClassMixin_getClass();
        classes.is(this.state.focused, 'focused');


        if (!this.state.checked) {
            classes.modifier('inactive');
        }

        if (this.props.disabled) {
            classes.modifier('disabled');
        }

        return <div className={classes.className} onClick={this.onClick}>
            <label>{this.props.children}</label>
            <input 
                className="ToggleBox_input" 
                type="checkbox" 
                checked={this.state.checked} 
                onFocus={this.onFocus} 
                onBlur={this.onBlur}
                onChange={this.onChange}
            />
        </div>;
    }
});

module.exports = ToggleBox;