import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

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
        var el = this.refs.input;
        var value;

        if (this.props.type === 'checkbox') {
            value = el.checked;
        }
        else {
            value = el.value;
        }

        return {
            key: this.props.name,
            value: (this.props.type === 'number') ? parseInt(value, 10) : value
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
