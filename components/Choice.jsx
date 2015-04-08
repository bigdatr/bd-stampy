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
        closeIcon: React.PropTypes.element,
        onDelete: React.PropTypes.func,
        component: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            disabled: false,
            selected: false,
            closeIcon: <Icon name="cross" size="small"/>,
            component: 'li'
        };
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Choice')
            .is(this.props.disabled, 'disabled')
            .is(this.props.selected, 'selected')
        ;

        var el = (
            <div>
                {this.props.children}
                {this.renderCross()}
            </div>
        );

        return React.createElement(this.props.component, {className: classes.className}, el);
    },
    renderCross: function () {
        if (!this.props.disabled) {
            return <button className="Choice_delete" onClick={this.props.onDelete} aria-label="clear">{this.props.closeIcon}</button>;
        }
    }
});

module.exports = Choice;
