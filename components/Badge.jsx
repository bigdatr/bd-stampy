/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Badge = React.createClass({
    displayName: 'Badge',
    mixins: [ClassMixin],
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