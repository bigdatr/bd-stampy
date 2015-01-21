/** @jsx React.DOM */
/**
 * Tab
 *
 * @param {String} example  <p>See TabView for demo</p>
 */
var React = require('react');
var Icon = require('./Icon.jsx');

var Tab = React.createClass({
    displayName: 'Tab',
    type: 'Tab',
    propTypes: {
        icon: React.PropTypes.string,
        text: React.PropTypes.string
    },
    render: function() {
        return (
            <span className={this.props.className} onClick={this.props.onClick}>
                {this.renderIcon()}
                <span className="Tab_text">{this.props.text}</span>
                {this.props.children}
            </span>
        );
    },
    renderIcon: function () {
        if (this.props.icon) {
            return <Icon name={this.props.icon} size="small"/>;
        }
    }
});

module.exports = Tab;