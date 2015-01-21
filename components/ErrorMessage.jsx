/** @jsx React.DOM */
var React = require('react');

var ErrorMessage = React.createClass({
    displayName: 'ErrorMessage',
    render: function() {
        return <div className="ErrorMessage">{this.props.children}</div>;
    }
});

module.exports = ErrorMessage;
