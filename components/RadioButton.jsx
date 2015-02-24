var React = require('react');
var Input = require('./InputElement');

var RadioButton = React.createClass({
    displayName: 'RadioButton',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    render: function () {
        var classes = this.ClassMixin_getClass('Radio');
        
        return (
            <label className={classes.className}>
                <Input 
                    type="radio"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    defaultChecked={this.props.defaultChecked}
                    className={classes.child('input')}
                />
                <span className={classes.child('label')}>{this.props.children}</span>
            </label>
        );
    },
    
});

module.exports = RadioButton;