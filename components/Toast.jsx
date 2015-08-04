console.warn('Warning Toast.jsx will be deprecated in the next minor version.');
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Toast = React.createClass({
    displayName: 'Toast',
    mixins: [
        ClassMixin,
        PureRenderMixin
    ],
    propTypes: {
        durationMS: React.PropTypes.number,
        message: React.PropTypes.string,
        autohide: React.PropTypes.bool,
        onHidden: React.PropTypes.func,
        height: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            durationMS: 1000,
            message: null,
            autohide: true
        };
    },
    componentDidMount: function () {
        this.componentDidUpdate();
    },
    componentDidUpdate: function () {
        if (this.props.message) {
            setTimeout(this.show, 0);
        }
    },
    show: function() {
        if (this.props.autohide) {
            setTimeout(() => this.hide(), this.props.durationMS);
        }
    },
    hide: function() {
        if (this.props.onHidden) {
            this.props.onHidden();
            // setTimeout(() => this.props.onHidden(), this.props.durationMS);
        }
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Toast');
        var closeButton;

        if (this.props.message) {
            closeButton = <div onClick={this.hide}>CLOSE</div>;
        }

        return (
            <div className={classes.className}>{this.props.message}</div>
        );
    }
});

module.exports = Toast;
