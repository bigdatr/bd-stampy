
var React = require('react');
var Label = require('./Label.jsx');
var ClassBuilder = require('../utils/ClassBuilder');

var InputRow = React.createClass({
    displayName: 'InputRow',
    propTypes: {
        label: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.object
        ]),
        width: React.PropTypes.number,
        visible: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            visible: true
        };
    },
    render: function() {
        var classes = new ClassBuilder('InputRow');
        classes.add(!this.props.visible, 'is-disabled');
        classes.add(this.props.className);
        }

        return (
            <div className={classes.className}>
                <div className="InputRow_label"><Label>{this.props.label}</Label></div>
                <div className="InputRow_input">{this.props.children}</div>
            </div>
        );
    }
});

module.exports = InputRow;
