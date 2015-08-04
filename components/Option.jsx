console.warn('Warning Option.jsx will be deprecated in the next minor version.');
var React = require('react');

var Option = React.createClass({
    displayName: 'Option',
    render: function () {
        return {value: this.props.value, label: this.props.children};
    }
});

module.exports = Option;
