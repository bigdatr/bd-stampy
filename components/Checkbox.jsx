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
    render: function () {
        var classes = this.ClassMixin_getClass('Checkbox');
        return (
            <label className={classes.className}>
                <Input 
                    type="checkbox"
                    className={classes.child('input')}
                    name={this.props.name}
                    checked={this.props.checked}
                    defaultChecked={this.props.checked || false}
                    onChange={this.props.onChange}
                />                  
                <span className={classes.child("text")}>{this.props.children}</span>
            </label>
        );
    },
    
});

module.exports = Checkbox;