/** @jsx React.DOM */
var React = require('react');

var Tag = React.createClass({
    displayName: 'Tag',
    getDefaultProps: function () {
        return {
            component: 'div'
        };
    },
    shouldComponentUpdate: function (nextProps) {
        if(nextProps.data !== this.props.data) {
            return true;
        }
        return false;  
    },
    render: function() {
        // var props = {
        //     key: this.props.key
        // };
        return React.createElement(this.props.component, this.props ,this.props.data);
    }
});

module.exports = Tag;