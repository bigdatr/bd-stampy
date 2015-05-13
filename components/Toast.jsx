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
            durationMS: 3000,
            message: null,
            autohide: true,
            height: 100
        };
    },
    getInitialState: function () {
        return {
            opacity: 0.2,
            bottom: this.props.height * -1
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
            opacity: 0.98,
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

        if (this.props.onHidden) {
            setTimeout(function() {
                this.props.onHidden();
            }.bind(this), this.props.durationMS + 300);
        }
    },
    render: function() {
        // TODO: This is just a prototype component, needs lots of refactoring
        var classes = this.ClassMixin_getClass('Toast');

        var styles = {
            wrapper: {
                position: 'absolute',
                bottom: this.state.bottom,
                left: 0,
                width: '100%',
                height: this.props.height,
                opacity: this.state.opacity,
                transition: 'all 0.3s ease-out',
                transform: 'translatez(0)'
            },
            toastStyle: {
                position: 'relative',
                height: '100%',
                width: '100%',
                backgroundColor: 'hotpink',
                color: '#333',
                fontSize: 30,
                fontWeight: 600
            },
            closeStyle: {
                position: 'absolute',
                right: 20,
                bottom: 0,
                padding: 5,
                fontSize: 14,
                cursor: 'pointer',
                color: '#fff',
                fontWeight: 100
            }
        };

        var closeButton;

        if (this.props.message) {
            closeButton = <div style={styles.closeStyle} onClick={this.hide}>CLOSE</div>;
        }

        return (
            <div className={classes.className} style={styles.wrapper}>
                <div className="Toast_wrapper" style={styles.toastStyle}>
                    {this.props.message}
                    {closeButton}
                </div>
            </div>
        );
    }
});

module.exports = Toast;
