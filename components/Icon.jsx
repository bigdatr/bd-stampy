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
            componentType: React.DOM.span,
            type: 'fontface',
        };
    },
    render() {        
        this.classes = this.ClassMixin_getClass();
        this.classes.modifier(this.props.size);
        this.classes.modifier(this.props.name.toLowerCase());

        if(this.props.type === 'svg') {
            return this.renderSvg();
        }
        return this.renderFontFace();
    },
    renderSvg() {        
        this.classes.modifier('svg');
        return <svg {...this.props} className={this.classes.className} dangerouslySetInnerHTML={{__html: '<use xlink:href="#' + this.props.name + '"></use>'}}></svg>;
    },
    renderFontFace() {
        var componentType = this.props.componentType;

        if(this.props.onClick) {
            componentType = React.DOM.a;        
        }

        

        // Switch Out Icon Types        
        var iconType = (this.props.size === 'small') ? 1 : 0;

        var iconCode = '\uE001';
        var name = this.props.name.toLowerCase();

        if(IconConstants[name] && IconConstants[name][iconType]) {
            iconCode = IconConstants[name][iconType];
        }
        
        return componentType({
            className: this.classes.className, 
            onClick: this.props.onClick,
            onMouseDown: this.props.onMouseDown,
            'data-icon': iconCode,
            ariaHidden:true,
            style: this.props.style
        }, this.props.children);
    }
});

module.exports = Icon;
