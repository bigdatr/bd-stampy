/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Checkbox = React.createClass({
    displayName: 'Checkbox',
    mixins: [ClassMixin],
    propTypes: {
        name: React.PropTypes.string,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },
    getInitialState: function() {
        return {
            checked: this.props.checked
        };
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
    handleClick: function() {
        this.setState({
        	checked: !this.state.checked
        }, this.onChange);
    },
    render: function() {
    	var classes = this.ClassMixin_getClass()
    	    .add(this.state.checked, 'is-active');

        return (
            <span className={classes.className} onClick={this.handleClick}>
                <input 
                    className={classes.child('input')} 
                    type="checkbox" 
                    name={this.props.name} 
                    onChange={this.handleClick} 
                    checked={this.state.checked}
                    defaultChecked={this.props.checked}
                />
                <span className={classes.child('box')}></span>
                <div className={classes.child('text')}>{this.props.children}</div>
            </span>
        );
    }
});

module.exports = Checkbox;