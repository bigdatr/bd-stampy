/**
 * Tab
 *
 * @param {String} example  <p>See TabView for demo</p>
 */
var React = require('react/addons');

var Tab = React.createClass({
    displayName: 'Tab',
    type: 'Tab',
    mixins: [React.addons.PureRenderMixin],
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
