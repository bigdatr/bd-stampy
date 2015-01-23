/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Label = require('./Label');
var Input = require('./Input');


var FieldSet = React.createClass({
    displayName: 'FieldSet',
    propTypes: {
        schema: React.PropTypes.object.isRequired,
        defaultValue: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render() {       
        var formItems = _(this.props.schema).map((item, key) => {
            return (
                <div key={key}>
                    {this.renderLabel(item, key)}
                    {this.renderFormElement(item, key)}
                </div>
            );
        }, this);

        return <div>{formItems}</div>;

    },
    renderLabel(item, key) {
        var label = item.label || key;
        
        if(typeof item === 'string') {
            label = item;
        }

        return <Label>{label}</Label>;
    },
    renderFormElement(item, key) {
        var element = item.type || Input;
        var defaultProps = {
            onChange: this.props.onChange,
            name: key,
            defaultValue: this.props.defaultValue[key]
        };

        if(typeof item === 'string') {
            return Input(defaultProps);
        }

        var props = _.defaults(defaultProps, item.props);

        return element(props);
    }
});

module.exports = FieldSet;
