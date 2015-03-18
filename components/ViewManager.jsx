/** @jsx React.DOM */

var React = require('react/addons');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ClassMixin = require('../mixins/ClassMixin.jsx');

var ViewManager = React.createClass({
    displayName: 'ViewManager',
    mixins: [ClassMixin, PureRenderMixin],
    propTypes: {
        position: React.PropTypes.number
    },
    getDefaultProps: function() {
        return {
            position: 1
        };
    },
    componentDidMount: function () {
        window.scroll(0,0);
    },
    render: function() {
        var classes = this.ClassMixin_getClass();

        return (
            <div className={classes.className}>{this.renderChildren()}</div>
        );
    },
    renderChildren: function() {
        var displayIndex = this.props.position - 1;

        var children = React.Children.map(this.props.children, function(child, i) {
            return React.addons.cloneWithProps(child, {
                visible: i === displayIndex
            });
        });

        return children;
    }
});

module.exports = ViewManager;
