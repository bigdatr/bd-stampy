var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var ClassMixin = require('../mixins/ClassMixin.jsx');

var Label = React.createClass({
    displayName: 'Label',
    mixins: [
        ClassMixin,
        PureRenderMixin
    ],
    render: function() {
        var classes = this.createClassName('Label');
        return <label className={classes.className} htmlFor={this.props.htmlFor}>{this.props.children}</label>;
    }
});

module.exports = Label;
