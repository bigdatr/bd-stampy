/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Label = require('./Label');
var Input = React.createFactory(require('./Input'));
var SelectStandard = require('./SelectStandard');


var FieldSet = React.createClass({
    displayName: 'FieldSet',
    propTypes: {
        schema: React.PropTypes.object.isRequired,
        defaultValue: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    render() {       
        var keys = Object.keys(this.props.schema);
        var formItems = keys.map((key, index) => {
            return (
                <div key={key}>
                    {this.renderLabel(this.props.schema[key], keys[index])}
                    {this.renderFormElement(this.props.schema[key], keys[index])}
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
        // console.log(item);
        // var element = item.type || Input;
        
        // Defaults 
        var defaultProps = {
            onChange: this.props.onChange,
            name: key.toString(),
            defaultValue: this.props.defaultValue[key]
        };

        if(item.enum) {
            // console.log(defaultProps);
            var options = item.enum.map((item) => {
                return {value: item, label: item};
            });
            
            return <SelectStandard {...defaultProps} value={this.props.defaultValue[key]} options={options}/>;
        }

        if(item.type === 'string') {
            return Input(defaultProps);
        }
        // var props = _.defaults(defaultProps, item.props);


        // // // Form Element Logic

        // // if(item.enum) {
        // //     return this.renderSelect(props, item.enum);
        // // }





        return Input(defaultProps);
    },
    renderSelect(props, selectItems) {
        return <DefualtSelect {...props}>{selectItems}</DefualtSelect>;
    }
});

module.exports = FieldSet;
