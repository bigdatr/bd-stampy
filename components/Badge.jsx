/**
 * @fileOverview file test tasks. These tasks are intended to help you when modifying the template. If you are
 * just using the template, don't sweat this stuff. To use these tasks, you must install grunt, if you haven't already,
 * and install the dependencies. All of this requires node.js, of course.
 *
 * @module filez
 * @requires path
 * @requires lodash
 * @requires http
 * @requires async
 * @requires fs
 */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Badge = React.createClass({
    displayName: 'Badge',
    mixins: [ClassMixin, PureRenderMixin],
    propTypes: {
        color: React.PropTypes.string
    },
    render: function() {
        var classes = this.ClassMixin_getClass();
        classes.modifier(this.props.color);
        classes.is(this.props.disabled, 'disabled');

        if(this.props.children){
            return <div className={classes.className} onClick={this.props.onClick}>{this.props.children}</div>;
        }else{
            return <span></span>;
        }

    }
});

module.exports = Badge;
