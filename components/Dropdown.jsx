/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var Dropdown = React.createClass({
    displayName: 'Dropdown',
    mixins: [ClassMixin],
    propTypes: {
        target: React.PropTypes.element,
        active: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            active: this.props.active
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if(nextProps.active !== undefined){
            this.setState({active: nextProps.active});
        }
    },
    onToggle: function(e) {
        this.setState({active: !this.state.active});
        e.stopPropagation();
        this.props.reactEvent = true;
    },
    onClose: function(e) {
        if(!this.props.reactEvent){
            this.setState({active: false});            
        }
        this.props.reactEvent = false;
    },
    handleClick: function(e) {

    },
    componentWillMount: function() {
        document.addEventListener("click", this.onClose, false);
    },
    componentWillUnmount: function() {
        document.removeEventListener("click", this.onClose, false);
    },
    render: function() {
        
        var classes = this.ClassMixin_getClass();
        classes.modifier(this.props.type);
        classes.is(this.state.active, 'active');
        
        return (
            <div className={classes.className} ref='dropdown' onClick={this.onToggle} {...this.props}>
                <div className='Dropdown_target'>{this.props.target}</div>
                <div className='Dropdown_button'>{this.props.children}</div>
            </div>
        );
    }
});

module.exports = Dropdown;