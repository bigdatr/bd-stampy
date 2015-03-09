/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Form = require('./Form');

var Fieldset = React.createClass({
    displayName: 'Fieldset',
    mixins: [
        require('../mixins/FormMixin')
    ],
    propTypes: {
        name: React.PropTypes.string,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func,
        schema: React.PropTypes.object
    },
    onChange: function(e, details) {
        this.FormMixin_onFormChange(e,details, this.onUpdate);
    },
    onUpdate: function () {
        if (this.props.onChange) {
            this.props.onChange(null, {
                key: this.props.name,
                value: _.defaults(this.state.formData, this.props.value)
            });
        }
    },
    render: function () {
        return (
            <fieldset>
                <Form
                    schema={this.props.schema}
                    onChange={this.onChange}
                    value={this.props.value}
                />
            </fieldset>
        );
    }
});

module.exports = Fieldset;
