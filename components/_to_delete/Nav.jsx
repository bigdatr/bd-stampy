/** @jsx React.DOM */
var React = require('react');
// var HelpersMixin = require('../mixins/HelpersMixin.jsx');

var Nav = React.createClass({
    displayName: 'Nav',
    // mixins: [HelpersMixin],
    propTypes: {
        isOpened: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            isOpened: this.props.isOpened
        };
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({isOpened: nextProps.isOpened});
    },
    render: function() {
    	return (
            <nav className={this.state.isOpened ? '' : 'is-closed'}>
                {this.props.children}
            </nav>
        );
    }
});

module.exports = Nav;