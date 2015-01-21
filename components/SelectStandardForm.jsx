/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var SelectStandard = require('./SelectStandard.jsx');
var Url = require('../utils/Url.js');

var SelectStandardForm = React.createClass({
    displayName: 'SelectStandardForm',
    mixins: [
        require('../mixins/FormMixin')
    ],
    propTypes: {
        options: React.PropTypes.array.isRequired,
        name: React.PropTypes.string.isRequired
    },
    onChange: function (e, details) {
        var query = {};
        query[details.key] = details.value;
        Url.setState(query);

        if(this.props.onChange) {
            this.props.onChange(e, details);
        }
    },

    render: function() {
        return (
            <SelectStandard 
                name={this.props.name}
                options={this.props.options}
                value={this.props.value}
                onChange={this.onChange}
            ></SelectStandard>
        );
    }
});

module.exports = SelectStandardForm;