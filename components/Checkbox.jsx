var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Input = require('./InputElement');
var ClassMixin = require('../mixins/ClassMixin');

var Checkbox = React.createClass({
    displayName: 'Checkbox',
    propTypes: {
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },
    mixins: [ClassMixin, PureRenderMixin],
    onClick: function (ee) {
        // Manual toggle hack. Somtimes the lable clickevent will auto scroll to nowhere...
        var checkbox = this.refs.checkbox.getDOMNode();
        checkbox.checked = !checkbox.checked;
        ee.preventDefault();
    },
    render: function () {
        var classes = this.ClassMixin_getClass('Checkbox');
        return (
            <label className={classes.className} onClick={this.onClick}>
                <Input
                    type="checkbox"
                    ref="checkbox"
                    className={classes.child('input')}
                    name={this.props.name}
                    checked={this.props.checked}
                    defaultChecked={this.props.checked || false}
                    onChange={this.props.onChange}
                />
                <span className={classes.child("label")}>{this.props.children}</span>
            </label>
        );
    },

});

module.exports = Checkbox;
