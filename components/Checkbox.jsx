/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var Label = require('./Label');

var Checkbox = React.createClass({
    displayName: 'Checkbox',
    mixins: [ClassMixin],
    getInitialState: function() {
        return {checked: false};
    },
    getDetails: function() {
        return {
            key: this.props.name,
            value: this.state.checked
        };
    },
    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e, this.getDetails());
        }
    },
    handleClick: function(e) {
        this.setState({
        	checked: !this.state.checked
        });
    },
    render: function() {
    	var classes = this.ClassMixin_getClass()
    	    .add(this.state.checked, 'is-active');

        return (  
            <Label onClick={this.handleClick}>
            	<span className={classes.className} onClick={this.handleClick}></span>
                <span onClick={this.handleClick}>{this.props.children}</span>
            </Label>
        );
    }
});

module.exports = Checkbox;