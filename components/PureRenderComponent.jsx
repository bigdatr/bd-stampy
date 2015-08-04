console.warn('Warning PureRenderComponent.jsx will be deprecated in the next minor version.');
var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var Tag = React.createClass({
    displayName: 'Tag',
    mixin: [PureRenderMixin],
    getDefaultProps: function () {
        return {
            component: 'div'
        };
    },
    render: function() {
        return React.createElement(this.props.component, this.props, this.props.children);
    }
});

module.exports = Tag;
