/**
 * Tab
 *
 * @param {String} example  <p>See TabView for demo</p>
 */
var React = require('react');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Tab = React.createClass({
    displayName: 'Tab',
    type: 'Tab',
    mixins: [PureRenderMixin],
    propTypes: {
        text: React.PropTypes.string
    },
    render: function() {
        return (
            <span className={this.props.className}>
                <span className="Tab_text">{this.props.text}</span>
                {this.props.children}
            </span>
        );
    }
});

module.exports = Tab;
