var React = require('react');
var ClassBuilder = require('../utils/ClassBuilder');

function splits (string) {
    return string.split(/[\s,]+/);
}

var ClassMixin = {
    propTypes: {
        type: React.PropTypes.string,
        color: React.PropTypes.string,
        is: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ]),
        modifier: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.array
        ])
    },
    ClassMixin_getClass: function(className){
        className = className || this._currentElement.type.displayName;
        var classBuilder = new ClassBuilder(className);

        classBuilder = this.ClassMixin_applyModifiers(classBuilder);
        classBuilder = this.ClassMixin_applyIs(classBuilder);

        if (this.props.className) {
            classBuilder.add(this.props.className);
        }

        return classBuilder;
    },
    ClassMixin_applyModifiers: function (classBuilder) {
        if (this.props.modifier) {

            // If comma string turn into an array.
            if (typeof this.props.modifier === 'string') {
                var modifiers = splits(this.props.modifier);
                this.props.modifier = modifiers.filter(function(m) {
                    return !!m; // Remove all falsey values. The values false, null, 0, "", undefined, and NaN are all falsey.
                });
            }
            
            // Apply the modifiers
            this.props.modifier.forEach(function(e) {
                classBuilder.modifier(e);
            });
        } 
        return classBuilder;
    },
    ClassMixin_applyIs: function (classBuilder) {
        if (this.props.is) {

            if(typeof this.props.is === 'string'){
                this.props.is = [this.props.is];
            }

            this.props.is.forEach(function(e) {
                classBuilder.is(e);
            });

        }
        return classBuilder;
    }
};

module.exports = ClassMixin;