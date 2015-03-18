/** @jsx React.DOM */
var React = require('react');
var ClassBuilder = require('../utils/ClassBuilder.js');

var Page = React.createClass({
    displayName: 'Page',
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
        var classes = new ClassBuilder('Page')
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

            return React.addons.cloneWithProps(child, {visible: visible});
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