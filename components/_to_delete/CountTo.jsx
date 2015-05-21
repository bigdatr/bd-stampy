
var React = require('react');

var CountTo = React.createClass({
    displayName: 'CountTo',
    propTypes: {
        value: React.PropTypes.number
    },
    render: function () {

        return (
            <div>CountTo</div>
        );
    }
});

module.exports = CountTo;