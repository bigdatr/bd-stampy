var React = require('react');

var Select = React.createClass({
    displayName: 'Select',
    mixins: [
        require('../mixins/ClassMixin'),
        require('../mixins/FormEventMixin')
    ],
    propTypes: {
        value: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },
    getDetails() {
        var el = this.refs.select.getDOMNode();
        return {
            key: this.props.name,
            value: el.value
        };
    },
    render() {
        var classes = this.createClassName('Select_element');
        return <select onChange={this.onChange} name={this.props.name} ref="select" className={classes.className} value={this.props.value}>
            {this.props.children}
        </select>;
    }
});

module.exports = Select;
