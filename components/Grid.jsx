/** @jsx React.DOM */
var React = require('react');

/**
 * Simple wrapper for grid classes
 */
var Grid = React.createClass({
    displayName: 'Grid',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    render: function() {
    	var classes = this.ClassMixin_getClass('grid');
        return <div className={classes.className}>{this.props.children}</div>;
    }
});

module.exports = Grid;
