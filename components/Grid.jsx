/** @jsx React.DOM */
var React = require('react');

var Grid = React.createClass({
    displayName: 'Grid',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    propTypes:{
        modifier: React.PropTypes.string
    },
    render: function() {
    	var classes = this.ClassMixin_getClass('grid');

        return <div className={classes.className}>{this.props.children}</div>;
    }
});

module.exports = Grid;
