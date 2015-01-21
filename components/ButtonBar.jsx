/** @jsx React.DOM */
var React = require('react');

var ButtonBar = React.createClass({
    displayName: 'ButtonBar',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        style: React.PropTypes.object
    },
    render: function() {
        var classes = this.ClassMixin_getClass('ButtonBar');
        return (  
        	<div className={classes.className} style={this.props.style}>{this.props.children}</div>
        );
    }
});

module.exports = ButtonBar;