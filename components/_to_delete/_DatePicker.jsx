
/**
 * DatePicker
 *
 * @param {String} example  <DatePicker value={new Date().getDay() + ' ' + new Date().toString().substr(4, 3) + ' ' + new Date().getFullYear()} />
 */
var React = require('react');
var DatePicker = React.createClass({
    displayName: 'DatePicker',
    propTypes: {
        // value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        onChange: React.PropTypes.func.isRequired,
        label: React.PropTypes.string
    },
    componentDidMount: function() {
        var el = this.refs.date.getDOMNode();
        $(el).date_input().on('change', this.onChange);
    },
    componentWillUnmount: function() {
        var el = this.refs.date.getDOMNode();
        $(el).off()
            .unbind();
    },
    onChange: function(e) {
        this.props.onChange(e);
        // {
        //     name: this.props.name,
        //     value: new Date(this.refs.date.getDOMNode().value).getTime()
        // }
    },
    onClick: function() {
        this.refs.date.getDOMNode().focus();
    },
    onKeyUp: function(e) {
        if (e.keyCode == 27) {
            // Stop Esc key from closing modal's
            e.stopPropagation();
            this.refs.date.getDOMNode().blur();
        }
    },
    render: function() {
        var classes = new React.addons.ClassBuilder('Input')
            .add(this.props.isValid === false, 'is-error')
        ;

        var value = this.props.value ? moment(this.props.value).format('D MMM YYYY') : '';

        return (
            <div className="DatePicker" onClick={this.onClick}>
                <input className={classes.className}
                    type="text"
                    id={this.props.name}
                    name={this.props.name}
                    ref="date"
                    placeholder="e.g. 2 May 2014"
                    onKeyUp={this.onKeyUp}
                    value={value}
                    readOnly={true}
                />
            </div>
        );
    }
});

module.exports = DatePicker;