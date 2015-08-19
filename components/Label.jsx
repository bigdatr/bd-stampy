var React = require('react/addons');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Label = React.createClass({
    displayName: 'Label',
    mixins: [
        ClassMixin,
        React.addons.PureRenderMixin
    ],
    render: function() {
        var classes = this.createClassName('Label');
        return <label className={classes.className} htmlFor={this.props.htmlFor}>{this.props.children}</label>;
    }
});

module.exports = Label;
