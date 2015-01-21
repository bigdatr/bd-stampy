/** @jsx React.DOM */
/**
 * TabContent
 *
 * @param {String} example  <p>See TabView for demo</p>
 */
var React = require('react');
var ClassBuilder = require('../utils/ClassBuilder');

var TabContent = React.createClass({
    displayName: 'TabContent',
    type: 'TabContent',
    propTypes: {
		padded: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            padded: false
        };
    },
    render: function() {
    	var classes = new ClassBuilder('TabContent')
    	    .add(this.props.padded, 'padding-hard');

        return (
            <div className={classes.className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = TabContent;