/*global window*/
var React = require('react');



var Dropdown = React.createClass({
    displayName: 'Dropdown',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    getInitialState() {
        return {
            active: false
        };
    },
    componentWillMount: function () {
        if (typeof window !== 'undefined') {
            window.addEventListener("click", this.closeDropdown, false);
        }
    },
    componentWillUnmount: function () {
        window.removeEventListener("click", this.closeDropdown, false);
    },
    openDropdown(e){
        this.setState({active: true});
    },
    closeDropdown(e) {
        if(!this.refs.button.getDOMNode().contains(e.target)) {
            this.setState({active: false});
        }
    },
    render() {
        var classes = this.ClassMixin_getClass('Dropdown').is(this.state.active, 'active');
        return (
            <div className={classes.className} onClick={this.openDropdown}>
                <div ref="button" className={classes.child('button')}>{this.props.button}</div>
                <ul className={classes.child('list')}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
});

module.exports = Dropdown;
