/** @jsx React.DOM */
var React = require('react');

var Icon = require('./Icon.jsx');
var ClassMixin = require('../mixins/ClassMixin.jsx');


var Choice = React.createClass({
    displayName: 'Choice',
    mixins: [ClassMixin],
    propTypes: {
        disabled: React.PropTypes.bool,
        selected: React.PropTypes.bool,
        onDelete: React.PropTypes.func
    },
    getDefaultProps: function () {
        return {
            disabled: false,
            selected: false
        };
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Choice')
            .is(this.props.disabled, 'disabled')
            .is(this.props.selected, 'selected')
        ;

        return (
            <li className={classes.className}>
                {this.props.children}
                {this.renderCross()}
            </li>
        );
    },
    renderCross: function () {
        if (!this.props.disabled) {
            return <Icon name="cross" size="small" className="Choice_delete" onClick={this.props.onDelete}/>;
        }
    }
});

module.exports = Choice;