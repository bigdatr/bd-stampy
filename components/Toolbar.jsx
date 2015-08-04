console.warn('Warning Toolbar.jsx will be deprecated in the next minor version.');
var React = require('react');
var Icon = require('../components/Icon.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var ClassMixin = require('../mixins/ClassMixin');

var Toolbar = React.createClass({
    displayName: 'Toolbar',
    mixins: [
        ClassMixin,
        PureRenderMixin
    ],
    propTypes: {
        icon: React.PropTypes.string,
        subtitle: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            action: []
        };
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Toolbar');

        return (
        	<div className={classes.className}>
                {this.renderTitle()}
                {this.props.children}
                {this.renderActions}
            </div>
        );
    },
    renderTitle: function() {
        if (this.props.title) {

            var text = <span>{this.renderIcon()}{this.props.title}</span>;

            if(this.props.href) {
                text = <a href={this.props.href}>{text}</a>;
            }

            return <div className='Toolbar_title'>{text}</div>;
        }
    },
    renderActions: function () {
        return this.props.action.map(function (action) {
            return action;
        });
    },
    renderIcon: function () {
        if (this.props.icon) {
            return <Icon name={this.props.icon} size="small" modifier="inline"></Icon>;
        }
    }
});

module.exports = Toolbar;
