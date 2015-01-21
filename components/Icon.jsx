/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var IconConstants = require('../constants/IconConstants.js');

var Icon = React.createClass({
    displayName: 'Icon',
    mixins:[ClassMixin],
    propTypes: {
        block: React.PropTypes.bool,
        component: React.PropTypes.func,
        inline: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        size: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {
            componentType: React.DOM.span
        };
    },
    render: function() {
        var componentType = this.props.componentType;

        if(this.props.onClick) {
            componentType = React.DOM.a;        
        }

        var classes = this.ClassMixin_getClass();
        classes.modifier(this.props.size);
        classes.modifier(this.props.name.toLowerCase());

        // Switch Out Icon Types        
        var iconType = (this.props.size === 'small') ? 1 : 0;

        var iconCode = '\uE001';
        var name = this.props.name.toLowerCase();

        if(IconConstants[name] && IconConstants[name][iconType]) {
            iconCode = IconConstants[name][iconType];
        }
        
        return componentType({
            className: classes.className, 
            onClick: this.props.onClick,
            onMouseDown: this.props.onMouseDown,
            'data-icon': iconCode,
            style: this.props.style
        }, this.props.children);
    }
});

module.exports = Icon;
