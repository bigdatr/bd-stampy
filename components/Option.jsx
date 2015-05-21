
var React = require('react');

var Option = React.createClass({
    displayName: 'Option',
    render: function () {
        return {value: this.props.value, label: this.props.children};
    }
});

module.exports = Option;