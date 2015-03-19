/** @jsx React.DOM */
var React = require('react');
var Icon = require('../components/Icon.jsx');

var Toolbar = React.createClass({
    displayName: 'Toolbar',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        icon: React.PropTypes.string,
        subtitle: React.PropTypes.string
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Toolbar');
        return (
        	<div className={classes.className}>
                {this.renderTitle()}
                {this.props.children}
                {this.props.action}
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
    renderAction: function () {
        if (this.props.action) {
            return this.props.action.map(function (action, key){
                return action;
            });
        }
    },
    renderIcon: function () {
        if (this.props.icon) {
            return <Icon name={this.props.icon} size="small" modifier="inline"></Icon>;
        }
    }
});

module.exports = Toolbar;
