
var React = require('react');

var Tr = React.createClass({
    displayName: 'Tr',
    shouldComponentUpdate: function (nextProps) {
        if(nextProps.children !== this.props.children) {
            return true;
        }

        return false;
    },
    render: function() {
        return <tr>{this.props.children}</tr>;
    }
});

module.exports = Tr;
