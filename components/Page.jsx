/* global document */
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
        visible: React.PropTypes.bool,
        scrollTop: React.PropTypes.number
    },
    _lastScrollPosition: 0,
    getDefaultProps: function () {
        return {
            content: 'static',
            visible: true,
            wrapper: true,
            scrollTop: null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (this.props.visible === true && nextProps.visible === false) {
            // Hiding the page
            if (this.props.scrollTop !== null) {
                this._lastScrollPosition = this.props.scrollTop;
            }
        }
    },
    componentDidUpdate: function (prevProps) {
        if (prevProps.visible === false && this.props.visible === true) {
            // Showing the page
            document.body.scrollTop = this._lastScrollPosition;
        }
    },
    onPageScroll: function() {
        this._lastScrollPosition = document.body.scrollTop;
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
                <div className="wrapper" onWheel={this.onPageScroll}>
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
