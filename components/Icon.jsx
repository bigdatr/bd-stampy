/** @jsx React.DOM */


var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var IconConstants = require('../constants/IconConstants.js');
var IconStore = require('../utils/IconStore');

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
            componentType: React.DOM.span,
            type: 'fontface',
        };
    },
    getClasses() {
        var classes = this.ClassMixin_getClass();
        classes.modifier(this.props.size);
        classes.modifier(this.props.name.toLowerCase());
        return classes;
    },
    render() {
        if (this.props.type === 'svg') {
            return this.renderSvg();
        }

        return this.renderFontFace();
    },
    renderSvg() {    
        var classes = this.getClasses();
        classes.modifier('svg');
        
        var path = IconStore.getPath(this.props.name);

        return (
            <svg    {...this.props}
                    className={classes.className}
                    width="0"
                    height="0"
                    viewBox="256 256 512 512">
                <path d={path}></path>
            </svg>
        );
    },
    renderFontFace() {
        var componentType = this.props.componentType;        

        // Switch Out Icon Types        
        var iconType = (this.props.size === 'small') ? 1 : 0;

        var iconCode = '\uE001';
        var name = this.props.name.toLowerCase();

        if(IconConstants[name] && IconConstants[name][iconType]) {
            iconCode = IconConstants[name][iconType];
        }

        var classes = this.getClasses();
        
        return componentType({
            className: classes.className, 
            onClick: this.props.onClick,
            onMouseDown: this.props.onMouseDown,
            'data-icon': iconCode,
            ariaHidden:true,
            style: this.props.style
        }, this.props.children);
    }
});

module.exports = Icon;
