console.warn('Warning Col.jsx will be deprecated in the next minor version.');
var React = require('react/addons');
var Col = React.createClass({
    displayName: 'Col',
    mixins: [
        React.addons.PureRenderMixin
    ],
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
