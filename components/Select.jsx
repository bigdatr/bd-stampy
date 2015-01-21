/** @jsx React.DOM */
var React = require('react');
var Typeahead = require('./Typeahead.jsx');

var Select = React.createClass({
    displayName: 'SelectBox',
    propTypes: {
        options: React.PropTypes.array.isRequired,
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        // onSearch: React.PropTypes.func.isRequired,
        // formatResults: React.PropTypes.func,
        // validate: React.PropTypes.func,
        // key: React.PropTypes.string,
        // isEditable: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {

        };
    },
    getInitialState: function() {
        return {
            results: [],
            value: this.props.value || []
        };
    },
    getDetails: function () {
        return {
            name: this.props.name,
            value: this.state.value
        };
    },
    onChange: function(e, details) {
        this.setState({value: details.values, results: []});

        if (this.props.onChange) {
            this.props.onChange(e, {
                name: this.props.name,
                value: details.values
            });
        }
    },
    onFocus: function(e) {
        this.setState({results: this.props.options});

        if (this.props.onFocus) {
            this.props.onFocus(e, this.getDetails());
        }
    },
    onClick: function(e) {
        if (this.state.value.length > 0) {
            this.onFocus(e);
        }
    },
    render: function() {
        return (
            <div className="Select" onClick={this.onClick}>
                <Typeahead name={this.props.name} 
                    results={this.state.results} 
                    onChange={this.onChange} 
                    onFocus={this.onFocus}
                    value={this.props.value} 
                    placeholder={this.props.placeholder}
                    valueKey={false}
                    clearable={false}
                ></Typeahead>
            </div>
        );
    },
});

module.exports = Select;