/** @jsx React.DOM */
var React = require('react');
var ClassBuilder = require('../utils/ClassBuilder.js');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Page = React.createClass({
    displayName: 'Page',
    mixins: [
        PureRenderMixin,
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        content: React.PropTypes.string,
        visible: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            content: 'static',
            visible: true,
            wrapper: true
        };
    },

    render: function () {
        var classes = this.ClassMixin_getClass('Page')
            .modifier(this.props.content)
            .add(!this.props.visible, 'is-hidden')
        ;

        var visible = this.props.visible;

        var children = React.Children.map(this.props.children, function(child) {
            if (!child) {
                return null;
            }
            else if (typeof child.props !== 'object') {
                return child;
            }

            return React.addons.cloneWithProps(child, {key: child.key || undefined, visible: visible});
        });

        var content = children;

        if (this.props.wrapper) {
            content = (
                <div className="wrapper">
                    {children}
                </div>
            );
        }

        return (
            <div className={classes.className}>
                {content}
            </div>
        );
    }
});

module.exports = Page;
