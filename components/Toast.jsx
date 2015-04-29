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
        autohide: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            durationMS: 3500,
            message: null,
            autohide: true
        };
    },
    getInitialState: function () {
        return {
            opacity: 0.2,
            bottom: -34
        };
    },
    componentDidMount: function () {
        this.componentDidUpdate();
    },
    componentDidUpdate: function () {
        if (!this.state.hasAnimated && this.props.message) {
            this.runAnimation();
        }
    },
    componentWillReceiveProps: function () {
        // Allow animation to start again
        this.setState({
            hasAnimated: false
        });
    },
    runAnimation: function() {
        setTimeout(this.show, 0);
    },
    show: function() {
        this.setState({
            opacity: 0.8,
            bottom: 0,
            hasAnimated: true
        });


        if (this.props.autohide) {
            var _this = this;

            setTimeout(function() {
                _this.hide();
            }, this.props.durationMS + 300);
        }
    },
    hide: function() {
        this.setState(this.getInitialState());
    },
    render: function() {
        // TODO: This is just a prototype component, needs lots of refactoring
        var classes = this.ClassMixin_getClass();

        var toastStyle = {
            position: 'absolute',
            bottom: this.state.bottom,
            left: 0,
            width: '100%',
            padding: 5,
            backgroundColor: '#333',
            color: '#fff',
            opacity: this.state.opacity,
            transition: 'all 0.3s ease-out',
            transform: 'translatez(0)'
        };

        var closeStyle = {
            position: 'absolute',
            right: 20,
            bottom: 0,
            padding: 5,
            fontSize: 12,
            cursor: 'pointer',
            color: 'hotpink'
        };

        var closeButton;

        if (this.props.message) {
            closeButton = <div style={closeStyle} onClick={this.hide}>CLOSE</div>;
        }

        return (
            <div className={classes.className} style={toastStyle}>
                {this.props.message}
                {closeButton}
            </div>
        );
    }
});

module.exports = Toast;
