/** @jsx React.DOM */


var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var IconConstants = require('../constants/IconConstants.js');
var IconStore = require('../utils/IconStore');

function getUnicodeCharacter(cp) {
    if (cp >= 0 && cp <= 0xD7FF || cp >= 0xE000 && cp <= 0xFFFF) {
        return String.fromCharCode(cp);
    }
    else if (cp >= 0x10000 && cp <= 0x10FFFF) {

        // we substract 0x10000 from cp to get a 20-bits number
        // in the range 0..0xFFFF
        cp -= 0x10000;

        // we add 0xD800 to the number formed by the first 10 bits
        // to give the first byte
        var first = ((0xffc00 & cp) >> 10) + 0xD800

        // we add 0xDC00 to the number formed by the low 10 bits
        // to give the second byte
        var second = (0x3ff & cp) + 0xDC00;

        return String.fromCharCode(first) + String.fromCharCode(second);
    }
}

var Icon = React.createClass({
    displayName: 'Icon',
    mixins:[
        ClassMixin
    ],
    propTypes: {
        name: React.PropTypes.string,
        block: React.PropTypes.bool,
        component: React.PropTypes.func,
        inline: React.PropTypes.bool,
        onClick: React.PropTypes.func,
        size: React.PropTypes.string,
        hexCode: React.PropTypes.string
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

        if(this.props.name) {
            classes.modifier(this.props.name.toLowerCase());
        }

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
        var paths = IconStore.getPaths(this.props.name);

        var viewBox = (this.props.size === 'small') ? '6 6 12 12' : '12 12 24 24';
        return (
            <svg {...this.props}
                className={classes.className}
                viewBox={viewBox}
                width="0"
                height="0">
                {paths.map((path, key) => <path key={key} d={path}></path>)}
            </svg>
        );
    },
    renderFontFace() {
        var componentType = this.props.componentType;
        var iconCode = '\uE001';
        var classes = this.getClasses();

        //name vs code point
        if(this.props.hexCode || this.props.decimalCode) {
            // Hex
            if(this.props.hexCode) {
                if(parseInt(this.props.hexCode, 16) > 57344) {
                    iconCode = getUnicodeCharacter(parseInt(this.props.hexCode, 16));
                } else {
                    iconCode = this.props.hexCode;
                }
            }
            // Decimal
            if(this.props.decimalCode) {
                iconCode = String.fromCharCode(this.props.decimalCode);
            }
        } else {
            // Named Icons
            var iconType = (this.props.size === 'small') ? 1 : 0;
            var name = this.props.name;
            if(name) {
                name = name.toLowerCase();
            }

            if(IconConstants[name] && IconConstants[name][iconType]) {
                iconCode = IconConstants[name][iconType];
            }
        }

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
