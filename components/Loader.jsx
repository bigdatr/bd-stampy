/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Loader = React.createClass({
    displayName: 'Loader',
    mixins: [ClassMixin],
    propTypes: {
        // color: React.PropTypes.oneOf(StampyUI.COLORS)
        test: React.PropTypes.number,
        type: React.PropTypes.oneOf(['', 'cover', 'blank', 'spinner'])
    },
    getDefaultProps: function() {
        return {
            type: null,
            test: null
        };
    },
    render: function() {    
        if (this.props.test) {
            return this.testLoaded(this.props.test, this.props.children);
        }


        var classes = this.ClassMixin_getClass().modifier(this.props.type);
        switch (this.props.type) {
            case 'spinner':
                return this.renderSpinner(classes);
            case 'cover':
                return this.renderCover(classes);
            case 'blank':
                return null;
            default: 
                return this.renderDefault(classes);
        }
    },
    renderDefault: function (classes) {
        classes.modifier('default');  
        return (
            <div className={classes.className} style={this.props.style}>
                <div className="Loader_unit"></div>
                <div className="Loader_unit"></div>
                <div className="Loader_unit"></div>
            </div>
        );
    },
    renderCover: function (classes) {
        classes.modifier('cover');  
        return (
            <div className={classes.className} style={this.props.style}>
                <div className="Loader_unit"></div>
                <div className="Loader_unit"></div>
                <div className="Loader_unit"></div>
            </div>
        );
    },
    renderSpinner: function (classes) {
        return (
            <div className="Loader-spinner_wrapper" style={this.props.style}>
                <div className={classes.className}>
                    <div className="Loader_segment1">
                        <div className="Loader_unit1"></div>
                        <div className="Loader_unit2"></div>
                        <div className="Loader_unit3"></div>
                        <div className="Loader_unit4"></div>
                    </div>
                    <div className="Loader_segment2">
                        <div className="Loader_unit1"></div>
                        <div className="Loader_unit2"></div>
                        <div className="Loader_unit3"></div>
                        <div className="Loader_unit4"></div>
                    </div>
                </div>
            </div>
        );
    },
    testLoaded: function (test, callback) {    
        var classes = this.ClassMixin_getClass().modifier(this.props.type);    
        if (test < 1) {
            return this.renderDefault(classes);
        }
        return callback;
    }

});

module.exports = Loader;