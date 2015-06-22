
var React = require('react');
var Label = require('./Label.jsx');
var ClassBuilder = require('../utils/ClassBuilder');

var InputRow = React.createClass({
    displayName: 'InputRow',
    propTypes: {
        label: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.object,
        ]),
        width: React.PropTypes.number,
        visible: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            width: 70,
            visible: true
        };
    },
    render: function() {
        var classes = new ClassBuilder('InputRow');
        classes.add(!this.props.visible, 'is-disabled');
        classes.add(this.props.className);

        var labelWidth = 100 - this.props.width;

        function widthStyle(width) {
            return {
                width: `${width}%`
            };
        }

        return (
            <div className={classes.className} style={this.props.style}>
                <div className="InputRow_label" style={widthStyle(labelWidth)}><Label>{this.props.label}</Label></div>
                <div className="InputRow_input" style={widthStyle(this.props.width)}>{this.props.children}</div>
            </div>
        );
    }
});

module.exports = InputRow;
