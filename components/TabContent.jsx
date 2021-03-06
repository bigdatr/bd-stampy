
/**
 * TabContent
 *
 * @param {String} example  <p>See TabView for demo</p>
 */
var React = require('react');
var ClassBuilder = require('../utils/ClassBuilder');
import PureRenderMixin from 'react-addons-pure-render-mixin';

var TabContent = React.createClass({
    displayName: 'TabContent',
    type: 'TabContent',
    mixins: [PureRenderMixin],
    propTypes: {
        padded: React.PropTypes.bool,
        visible: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            padded: false,
            visible: true
        };
    },
    render: function() {
        if(!this.props.visible) {
            return null;
        }

        var classes = new ClassBuilder('TabContent')
            .add(this.props.padded, 'padding-hard')
            .add(this.props.visible, 'is-active', 'is-hidden');


        return (
            <div className={classes.className}>
                {this.props.children}
            </div>
        );
    }
});

module.exports = TabContent;
