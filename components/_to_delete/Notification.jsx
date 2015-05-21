
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var Color = require('../utils/Color.jsx');
var Icon = require('../components/Icon.jsx');

var presets = {
    message: {
        color: 'blue',
        title: 'New Message',
        icon: 'envelope'
    },
    warning: {
        color: 'orange',
        title: 'Warning!',
        icon: 'warning'
    },
    success: {
        color: 'green',
        title: 'Success',
        icon: 'tick'
    },
    failure: {
        color: 'red',
        title: 'Failure',
        icon: 'bomb'
    }
};


var Notification = React.createClass({
    displayName: 'Notification',
    mixins:[ClassMixin],
    propTypes: {
        icon: React.PropTypes.string,
        color: React.PropTypes.string,
        title: React.PropTypes.string,
        type: React.PropTypes.string
    },
    getFromPropsOrPreset: function () {
        if(this.props.type) {
            if(presets[this.props.type]) {
                return presets[this.props.type];                
            }
        }
        return this.props;
    },
    render: function() {
        this.classes = this.ClassMixin_getClass('Notification');
        return (
            <div className={this.classes.className}>
                <div className={this.classes.child('content')}>
                    {this.renderIcon()}
                    {this.renderMessage()}
                </div>                
            </div>
        );
    },
    renderIcon: function () {
        return <div className={this.classes.child('icon')} style={{backgroundColor: Color(this.getFromPropsOrPreset().color).hexString()}}>
            <Icon name={this.getFromPropsOrPreset().icon}></Icon>
        </div>;
    },
    renderMessage: function () {
        return <div className={this.classes.child('message')}>
            <strong>{this.getFromPropsOrPreset().title}</strong>
            <div>{this.props.children}</div>
        </div>;
    }
});

module.exports = Notification;