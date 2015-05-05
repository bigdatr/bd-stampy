/** @jsx React.DOM */
var React = require('react');
var Col = React.createClass({
    displayName: 'Col',
    propTypes: {
        width: React.PropTypes.number
    },
    getDefaultProps: function() {
    	return {
    		className: ''
    	};
    },
    render: function() {
        var columnWidth = this.props.width ? 'col--'+this.props.width : 'col--';
        var className = columnWidth + ' ' + this.props.className;
        return <div {...this.props} className={className}>{this.props.children}</div>;
    }
});

module.exports = Col;
