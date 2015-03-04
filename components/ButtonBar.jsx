/** @jsx React.DOM */
var React = require('react');

var opposites = require('../constants/Opposites');

var ButtonBar = React.createClass({
    displayName: 'ButtonBar',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        style: React.PropTypes.object
    },
    render: function() {
        var classes = this.ClassMixin_getClass('ButtonBar')
            .add(this.props.attach, 'ButtonBar-attached');

        var styles = this.props.style || {};

        if (this.props.attach) {
            styles.position = 'fixed';
            styles[this.props.attach] = 0;
            styles[opposites[this.props.attach]] = 'auto';
        }

        return (  
        	<div className={classes.className} style={styles}>{this.props.children}</div>
        );
    }
});

module.exports = ButtonBar;