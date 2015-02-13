/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Label = require('./Label');
var InputRow = require('./InputRow');
var Input = React.createFactory(require('./Input'));
var Checkbox = React.createFactory(require('./Checkbox'));
var SelectStandard = require('./SelectStandard');

var sentenceCase = function (text) {
    return _.capitalize(_.words(text).join(' '));
};

var _defaultCustomElements = {
    textarea: require('./Textarea'),
    input: require('./Input'),
    checkbox: require('./Checkbox'),
    file: require('./SuperagentFileUpload')
}

var Form = React.createClass({
    displayName: 'Form',
    propTypes: {
        schema: React.PropTypes.object.isRequired,
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    getDefaultProps () {
        return {
            nested: false
        }
    },
    render() {
        return <div>{this.renderNodes(this.props.schema, this.props.value)}</div>;
    },
    renderNodes(nodes, mapContext) {
        return  _(nodes).keys().sort().map((key) => {
            var value = nodes[key]
            return this.renderNode(key, value, mapContext[key])
        }).value();
    },

    // Render a form node (label, element)
    // Context for both schema and data map is passed through.
    renderNode(key, schemaContext, mapContext) {
        if(schemaContext) {
            if(schemaContext.type === 'object') {
                if(this.props.nested) {
                    return (
                        <div key={key}>
                            <h2>{key}</h2>
                            {this.renderNodes(schemaContext.properties, mapContext)}
                        </div>
                    );                    
                }
            } else {            
                return (
                    <InputRow key={key} label={sentenceCase(key)}>
                        {this.renderFormElement(key, schemaContext, mapContext)}
                    </InputRow>
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

        return label;
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
            error: this.props.errors[key],
            value: value || ''
        };

        // Return Custom Elements First
        if(this.props.formShape && this.props.formShape[key]) {
            return this.renderCustomFormElement(key, item, value, defaultProps, this.props.formShape[key])
        }

        if(item.enum) {
            // console.log(defaultProps);
            var options = item.enum.map((item) => {
                return {value: item, label: item};
            });
            
            return <SelectStandard {...defaultProps} options={options}/>;
        }

        if(item.type === 'array') {
            defaultProps.disabled = true;
            defaultProps.value = 'unhandled';
            
            return Input(defaultProps);
        }

        if(item.type === 'boolean') {
            return Checkbox(defaultProps);
        }

        if(item.type === 'string' || item.type === 'number') {
            return Input(defaultProps);
        }



        return Input(defaultProps);
    },
    renderCustomFormElement(key, item, value, defaultProps, shape) {
        var customElement = _defaultCustomElements.input;
        var props = {};


        if(_.isString(shape)) {
            customElement = _defaultCustomElements[shape];
        }

        if(_.isObject(shape)) {
            customElement = _defaultCustomElements[shape.type || 'input'];
            props = shape.props || {};
        }

        return React.createElement(customElement, _.defaults(defaultProps, props));
    },
    renderSelect(props, selectItems) {
        return <DefualtSelect {...props}>{selectItems}</DefualtSelect>;
    }
});

module.exports = Form;
