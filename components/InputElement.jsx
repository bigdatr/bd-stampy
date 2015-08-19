var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Input = React.createClass({
    displayName: 'Input',
    mixins: [
        require('../mixins/ClassMixin'),
        require('../mixins/FormEventMixin'),
        PureRenderMixin
    ],
    propTypes: {
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.bool
        ]),
        type: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            type: 'text'
        };
    },
    getDetails() {
        var el = this.refs.input.getDOMNode();
        var value;

        if (this.props.type === 'checkbox') {
            value = el.checked;
        }
        else {
            value = el.value;
        }

        return {
            key: this.props.name,
            value: value
        };
    },
    render() {
        var classes = this.createClassName('Input').modifier(this.props.type);
        return <input
            {...this.props}
            ref="input"
            className={classes.className}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyUp={this.onKeyUp}
        />;
    }
});

module.exports = Input;
