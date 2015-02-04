/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Form = require('./Form');

var Fieldset = React.createClass({
    displayName: 'Fieldset',
    mixins: [
        require('bd-stampy/mixins/FormMixin')
    ],
    onChange: function(e, details) {
        this.FormMixin_onFormChange(e,details, this.onUpdate);
        
    },
    onUpdate: function () {
        if (this.props.onChange) {
            this.props.onChange(null, {
                key: this.props.name, 
                value: _.defaults(this.state.formData, this.props.defaultValue)
            });
        } 
    },
    render: function () {
        return (
            <fieldset>
                <Form 
                    schema={this.props.schema}
                    onChange={this.onChange}
                    defaultValue={this.props.defaultValue}
                />
            </fieldset>
        );
    }
});

module.exports = Fieldset;