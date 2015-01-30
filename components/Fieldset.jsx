/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Label = require('./Label');
var Input = React.createFactory(require('./Input'));
var SelectStandard = require('./SelectStandard');

var sentenceCase = function (text) {
    return _.capitalize(_.words(text).join(' '));
};

var FieldSet = React.createClass({
    displayName: 'FieldSet',
    propTypes: {
        schema: React.PropTypes.object.isRequired,
        defaultValue: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render() {
        return <div>{this.renderNodes(this.props.schema, this.props.defaultValue)}</div>;
    },
    renderNodes(nodes, mapContext) {
        return _.map(nodes, (dd, key) => {
            return this.renderNode(key, dd, mapContext[key])
        });
    },

    // Render a form node (label, element)
    // Context for both schema and data map is passed through.
    renderNode(key, schemaContext, mapContext) {
        if(mapContext && schemaContext) {
            if(schemaContext.type === 'object') {
                return (
                    <div>
                        <h2>{key}</h2>
                        {this.renderNodes(schemaContext.properties, mapContext)}
                    </div>
                );
            } else {            
                return (
                    <div>
                        <label>{sentenceCase(key)}</label>
                        {this.renderFormElement(key, schemaContext, mapContext)}
                    </div>
                );            
            }            
        }
    },
    renderLabel(item, key) {
        var label = key;
        if(item) {
            label = item.label || key;
        }

        if(typeof item === 'string') {
            label = item;
        }

        return <Label>{label}</Label>;
    },
    renderFormElement(key, item, value) {
        if(!item) {
            return '-';
        }
        // console.log(item);
        // var element = item.type || Input;
        
        // Defaults 
        var defaultProps = {
            onChange: this.props.onChange,
            name: key.toString(),
            defaultValue: value
        };

        if(item.enum) {
            // console.log(defaultProps);
            var options = item.enum.map((item) => {
                return {value: item, label: item};
            });
            
            return <SelectStandard {...defaultProps} value={value} options={options}/>;
        }

        if(item.type === 'array') {
            return <Input disabled={true} defaultValue="unhandled"/>;
        }

        if(item.type === 'string' || item.type === 'number') {
            return Input(defaultProps);
        }



        return Input(defaultProps);
    },
    renderSelect(props, selectItems) {
        return <DefualtSelect {...props}>{selectItems}</DefualtSelect>;
    }
});

module.exports = FieldSet;
