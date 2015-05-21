
'use strict';

var React = require('react'),
	Modal = require('./Modal.jsx');

var Alert = React.createClass({
    displayName: 'Alert',
    render: function () {
        return (
            <Modal className="Alert" {...this.props}>{this.props.children}</Modal>
        );
    }
});

module.exports = Alert;