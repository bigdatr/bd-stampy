/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var ListItemProperty = React.createClass({
    displayName: 'ListItemProperty',
    mixins: [ClassMixin],
    propTypes: {
        name: React.PropTypes.string.isRequired,
    },
    render: function() {
        var classes = this.ClassMixin_getClass('ListItemProperty');

        return (
            <li className={classes.className}>
                <span className="List-properties_name">{this.props.name}</span>
                <span className="List-properties_value">{this.props.children}</span>
            </li>
        );
    }
});

module.exports = ListItemProperty;
