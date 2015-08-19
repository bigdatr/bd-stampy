
var React = require('react');
var _ = require('lodash');

var ClassBuilder = require('../utils/ClassBuilder');

var SelectStandard = React.createClass({
    displayName: 'SelectStandard',
    mixins: [require('../mixins/ClassMixin')],
    propTypes: {
        options: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                value: React.PropTypes.string,
                label: React.PropTypes.string
            })
        ).isRequired,
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string
    },
    getInitialState: function() {
        var option = this.props.options[0];
        return {
            results: [],
            value: this.props.value || option.value
        };
    },
    // componentWillReceiveProps: function (nextProps) {
    //     var option = nextProps.options[0];
    //     this.setState({value: nextProps.value || option.value});
    // },
    getDetails: function () {
        return {
            key: this.props.name,
            value: this.state.value
        };
    },
    ifPropsFunctionExists: function (e, func) {
        if(this.props[func]) {
            this.props[func](e, this.getDetails());
        }
    },
    onBlur: function(e) {
        this.setState({results: []});
        this.ifPropsFunctionExists(e, 'onBlur');
    },
    onFocus: function(e) {
        this.setState({results: this.props.options});
        this.ifPropsFunctionExists(e, 'onFocus');
    },
    onChange: function (e, details) {
        if(this.props.onChange) {
            this.props.onChange(e, details);
        }
    },
    onSelect: function (key, e) {
        // Update state, fire the upstream change functions and finish with a blur.
        var option = this.props.options[key];
        this.setState({
            value: option.value,
            label: option.label
        });
        this.onChange(e, {
            key: this.props.name,
            value: option.value
        });
        this.onBlur(e);
    },
    render: function() {
        var classes = this.createClassName('Select').is(this.state.results.length, 'active');

        return (
            <div className={classes.className}>
                <input className="Select_value" onFocus={this.onFocus} onBlur={this.onBlur} name={this.props.name} value={this.renderValue()} readOnly/>
                {this.renderOptions()}
            </div>
        );
    },
    renderOptions: function () {
        if(this.state.results.length) {
            var options =  _.map(this.state.results, function (option, key){
                return <li key={key} onMouseDown={this.onSelect.bind(this, key)} value={option.value}>{option.label}</li>;
            }.bind(this));

            return <ul className="Select_options">{options}</ul>;
        }
    },
    renderValue: function () {
        var option =  _.find(this.props.options, {value: this.state.value}) || this.props.options[0];
        return option.label;
    }
});

module.exports = SelectStandard;
