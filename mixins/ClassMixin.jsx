var React = require('react');
var ClassBuilder = require('../utils/ClassBuilder');

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
        return this.createClassName(className);
    },
    createClassName: function (className) {
        var classBuilder = new ClassBuilder(className);

        classBuilder = this.ClassMixin_applyModifiers(classBuilder);
        classBuilder = this.ClassMixin_applyIs(classBuilder);

        if (this.props.className) {
            classBuilder.add(this.props.className);
        }

        return classBuilder;
    },
    ClassMixin_applyModifiers: function (classBuilder) {
        if (!this.props) {
            var _err = new Error('bd-stampy:ClassMixin_applyModifiers::Props do no exist, skipping.');
            console.log(_err.stack);
            return classBuilder;
        }

        if (this.props.modifier) {
            // Apply the modifiers
            this.props.modifier.split(' ').forEach(function(e) {
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
