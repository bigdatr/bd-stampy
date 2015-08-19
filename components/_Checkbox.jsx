
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Checkbox = React.createClass({
    displayName: 'Checkbox',
    mixins: [ClassMixin],
    getDetails: function() {
        return {
            key: this.props.name,
            value: !this.props.value
        };
    },
    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e, this.getDetails());
        }
    },
    render: function() {
    	var classes = this.createClassName('Checkbox')
    	    .add(this.props.value, 'is-active');

        console.warn('stampy::Checkbox is being used!');

        return (
            <span className={classes.className} onClick={this.handleClick}>
                <input
                    className={classes.child('input')}
                    type="checkbox"
                    name={this.props.name}
                    onChange={this.onChange}
                    checked={this.props.value}
                    defaultChecked={this.props.value}
                />
                <span className={classes.child('box')}></span>
                <span className={classes.child('text')}>{this.props.children}</span>
            </span>
        );
    }
});

module.exports = Checkbox;
