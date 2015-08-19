
var React = require('react');

var Td = React.createClass({
    displayName: 'Td',
    shouldComponentUpdate: function (nextProps) {
        if(nextProps.data !== this.props.data) {
            return true;
        }

        return false;
    },
    render: function() {
        return <td>{this.props.data}</td>;
    }
});

module.exports = Td;
