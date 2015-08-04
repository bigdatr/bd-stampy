console.warn('Warning Transition.jsx will be deprecated in the next minor version.');
var React = require('react');
var _ = require('lodash');
// var ReactTransition = React.addons.CSSTransitionGroup;

var Transition = React.createClass({
    displayName: 'Transition',
    propTypes: {
        component: React.PropTypes.element
    },
    getDefaultProps: function(){
        return {
            component: 'div'
        };
    },
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
    // componentWillUpdate: function() {
        var el = this.refs.item.getDOMNode();
        this.setState({height: el.clientHeight});
    },
    render: function() {
        if(this.props.disabled) {
            console.log('disabled');
            return this.props.children;
        }

        var style = {};
        if (this.state.height) {
            style.height = '20px !important';
        }

        style.height = this.state.height + 'px !important'; // 20px !important

        var component = React.DOM[this.props.component];

        var props = _.defaults({className:'TransitionItem', ref:"item", style:style}, this.props);
        return component(props, this.props.children);
    }
});

module.exports = Transition;


