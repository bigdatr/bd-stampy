/*eslint-disable */

// var _err = new Error('Warning CSS.js will be deprecated in the next minor version.');
// console.warn(_err.stack);


/*global document*/
// var CssPrefix = require('./CssPrefix');
var el;

if (typeof window !== 'undefined') {
    el = document.createElement('div');
}

var cache = {};
// var prefix = JSON.stringify(el.style).match(/(moz|webkit|ms)/)[0];
var prefixes = ["ms", "Moz", "Webkit", "O"];
var properties = [
    'transform',
    'transition',
    'transformOrigin',
    'transformStyle',
    'transitionProperty',
    'transitionDuration',
    'transitionTimingFunction',
    'transitionDelay',
    'borderImage',
    'borderImageSlice',
    'boxShadow',
    'backgroundClip',
    'backfaceVisibility',
    'perspective',
    'perspectiveOrigin',
    'animation',
    'animationDuration',
    'animationName',
    'animationDelay',
    'animationDirection',
    'animationIterationCount',
    'animationTimingFunction',
    'animationPlayState',
    'animationFillMode',
    'appearance'
];

var getVendorPrefix = function getVendorPrefix(property) {
    if(properties.indexOf(property) === -1 || typeof el.style[property] !== 'undefined'){
        return property;
    }

    property = property[0].toUpperCase() + property.slice(1);
    var temp;

    for(var i = 0; i < prefixes.length; i++){
        temp = prefixes[i] + property;
        if(typeof el.style[temp] !== 'undefined'){
            prefixes = [prefixes[i]]; // we only need to check this one prefix from now on.
            return temp;
        }
    }

    return property[0].toLowerCase() + property.slice(1);
};

// var hasRule = function hasRule(rule) {
//     return el.style[rule] === '' || el.style[prefix+rule] === '';
// };


//
// CSS Object
//

var _ = require('lodash');

var CSS = function CSS(props) {
    this.styles = props || {};
};

CSS.prototype.rule = function rule(name, value) {
    var nextStyles = {};
    nextStyles[name] = value;

    this.styles = _.defaults(nextStyles, this.styles);
};

CSS.prototype.prefix = function prefix() {
    var result = {};

    for (var key in this.styles) {
        if(cache[key] === undefined){
            cache[key] = getVendorPrefix(key);
        }
        result[cache[key]] = this.styles[key];
    }

    return result;
};


//
// Shortcuts
//

CSS.prototype.translateY = function translateY(value) {
    this.rule('transform', 'translateY(' + value + ')');
};

CSS.prototype.rotate = function translateY(value) {
    this.rule('transform', 'rotate(' + (value * 3.6) + 'deg)');
};


module.exports = CSS;
