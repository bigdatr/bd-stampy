var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

var Input = React.createClass({
    displayName: 'Input',
    mixins: [
        require('../mixins/ClassMixin'),
        require('../mixins/FormEventMixin'),
        PureRenderMixin
    ],
    propTypes: {
        value: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },
    getDefaultProps() {
        return {

        };
    },
    getDetails() {
        var el = this.refs.select.getDOMNode();
        return {
            key: this.props.name,
            value: el.value
        };
    },
    render() {
        var classes = this.ClassMixin_getClass('Select_element');
        return <select onChange={this.onChange} ref="select" className={classes.className}>
            {this.props.children}
        </select>;
    }
});

module.exports = Input;
