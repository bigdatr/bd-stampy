var React = require('react');
var Label = require('../components/Label.jsx');
var Icon = require('../components/Icon.jsx');

var Input = React.createClass({
    displayName: 'Input',
    mixins: [
        require('../mixins/ClassMixin'),
        require('../mixins/FormEventMixin')
    ],
    propTypes: {
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        type: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {
            type: 'text'
        };
    },
    getDetails() {
        console.log('getDetails');
        return {
            key: this.props.name,
            value: this.refs.input.getDOMNode().value
        };
    },
    render() {
        var classes = this.ClassMixin_getClass('Input').modifier(this.props.type);
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