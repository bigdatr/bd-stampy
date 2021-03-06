var React = require('react');
import PureRenderMixin from 'react-addons-pure-render-mixin';

var Input = require('./InputElement');
var ClassMixin = require('../mixins/ClassMixin');

/**
 * input[type=checkbox] that is wrapped in a label for easy clicking.
 */
var Checkbox = React.createClass({
    displayName: 'Checkbox',
    propTypes: {
        name: React.PropTypes.string.isRequired,
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },
    mixins: [
        ClassMixin,
        PureRenderMixin
    ],
    onClick: function (ee) {
        // Manual toggle hack. Somtimes the lable clickevent will auto scroll to nowhere...
        var checkbox = this.refs.checkbox;
        checkbox.checked = !checkbox.checked;
        ee.preventDefault();
        if (this.props.onChange) {
            this.props.onChange(ee, {
                key: this.props.name,
                value: checkbox.checked
            });
        }
    },
    render: function () {
        var classes = this.createClassName('Checkbox');
        classes.is(this.props.checked, 'checked');
        return (
            <label className={classes.className} onClick={this.onClick}>
                <Input
                    type="checkbox"
                    ref="checkbox"
                    className={classes.child('input')}
                    name={this.props.name}
                    onClick={this.onClick}
                    checked={this.props.checked}
                    defaultChecked={this.props.checked || false}
                />
                <span className={classes.child("label")}>{this.props.children}</span>
            </label>
        );
    },

});

module.exports = Checkbox;
