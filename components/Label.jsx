/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Label = React.createClass({
    displayName: 'Label',
    mixins: [ClassMixin],
    render: function() {
        var classes = this.ClassMixin_getClass();
        return <label className={classes.className} htmlFor={this.props.htmlFor}>{this.props.children}</label>;
    }
});

module.exports = Label;
