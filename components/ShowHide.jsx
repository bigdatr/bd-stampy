

var React = require('react');

var ShowHide = React.createClass({
    displayName: 'ShowHide',
    mixins: [
        require('../mixins/ClassMixin.jsx')
    ],
    propTypes: {
        onClick: React.PropTypes.func,
        active: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        button: React.PropTypes.element
    },
    getDefaultProps: function () {
        return {
            component: React.DOM.div,
            active: false,
            disabled: false,
            button: null
        };
    },
    getInitialState: function() {
        return {
            active: this.props.active
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({active: nextProps.active});
    },
    onClick: function(e) {
        if (!this.props.disabled) {
            var state = {active: !this.state.active};
            this.setState(state);

            if (this.props.onClick) {
                this.props.onClick(e, state);
            }
        }
    },
    render: function() {
        var classes = this.ClassMixin_getClass('ShowHide');

        if (this.state.active) {
            classes.modifier('active');
        }

        if (this.props.disabled) {
            classes.modifier('disabled');
        }


        if(this.props.button) {
            var newButton = React.addons.cloneWithProps(this.props.button, {onClick: this.onClick});
            return <div className={classes.className}>
                {newButton}
                {this.props.component({className:'ShowHide_content'},this.props.children)}
            </div>;

        }

        return this.props.component({
            className: classes.className,
            onClick: this.onClick
        },this.props.children);
    }
});

module.exports = ShowHide;
