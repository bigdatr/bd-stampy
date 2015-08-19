var React = require('react');
var Input = require('./InputElement');

var RadioButton = React.createClass({
    displayName: 'RadioButton',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    render: function () {
        var classes = this.createClassName('Radio');
        var defaultChecked = this.props.defaultChecked;
        if(this.props.defaultCheckedFromValue === this.props.value) {
            defaultChecked = true;
        } else {
            classes.modifier('inactive');
        }

        return (
            <label className={classes.className}>
                <Input
                    type="radio"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    defaultChecked={defaultChecked}
                    className={classes.child('input')}
                />
                <span className={classes.child('label')}>{this.props.children}</span>
            </label>
        );
    },

});

module.exports = RadioButton;
