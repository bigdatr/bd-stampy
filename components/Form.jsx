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
    typeahead: require('./Typeahead'),
    file: require('./SuperagentFileUpload')
}

var Form = React.createClass({
    displayName: 'Form',
    propTypes: {
        schema: React.PropTypes.object.isRequired,
        value: React.PropTypes.object.isRequired,
        onlyOrder: React.PropTypes.bool,
        onChange: React.PropTypes.func.isRequired
    },
    getDefaultProps () {
        return {
            nested: false,
            onlyOrder: false
        }
    },
    render() {
        var form;

        var order = this.props.order;

        if(!this.props.onlyOrder) {
            order = _.chain(this.props.order)
                .union(_.keys(this.props.schema))
                .value();
        }
 
        if(this.props.nested) {
            form = this.renderNodes(this.props.schema, this.props.value);            
        } else {
            form = this.renderOrderedNodes(order);
        }

        return <div>{form}</div>
    },
    renderOrderedNodes(order) {
        return  _.map(order, (value) => {
            return this.renderNode(value, this.props.schema[value], this.props.value[value]);
        });
    },
    renderNodes(nodes, mapContext) {
        return  _.map(nodes, (value, key) => {
            return this.renderNode(key, value, mapContext[key])
        });
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
                if(this.props.formShape[key] !== false) {
                    return (
                        <InputRow key={key} label={this.renderLabel(key)}>
                            {this.renderFormElement(key, schemaContext, mapContext)}
                        </InputRow>
                    );
                }
            }            
        }
    },
    renderLabel(key) {
        var label = key;
        var shape = this.props.formShape;
        if(shape[key] && shape[key].label) {
            label = shape[key].label;
        }
        
        return _.isString(label) ? sentenceCase(label) : label;
    },
    renderFormElement(key, item, value) {
        if(!item) {
            return '-';
        }
        var shape = this.props.formShape;
        var enums = item.enum;
        var shapeProps = (shape[key]) ? shape[key].props : null;
        var defaultProps = _.defaults({
            onChange: this.props.onChange,
            name: key.toString(),
            error: this.props.errors[key],
            type: 'text',
            value: value || ''
        }, shapeProps);

        
        if(item.items) {
            enums = item.items.enum;
        }

        // Return Custom Elements First
        
        if(shape && shape[key] && shape[key].type) {
            return this.renderCustomFormElement(key, item, value, defaultProps, shape[key], enums)
        }        

        if(enums) {
            // console.log(defaultProps);
            var options = enums.map((item) => {
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
            defaultProps.type = 'text';
            return Input(defaultProps);
        }

        return Input(defaultProps);
    },
    renderCustomFormElement(key, item, value, defaultProps, shape, enums) {
        var customElement = _defaultCustomElements.input;
        var props = {};

        if(enums) {
            defaultProps.multiple = true;

            if(!value) {
                defaultProps.value = [];   
            }
            defaultProps.children = _.map(enums, (value, key)=> {
                return <option value={value} key={key}>{_.capitalize(value)}</option>;
            });   
        }


        if(_.isString(shape)) {
            customElement = _defaultCustomElements[shape];
        }

        if(_.isObject(shape)) {
            if(!_.isString(shape.type)) {
                customElement = shape.type;
            } else {
                customElement = _defaultCustomElements[shape.type || 'input'];                
            }
            props = shape.props || {};
        }
        return React.createElement(customElement, _.defaults(defaultProps, props));
    }
});

module.exports = Form;
