/** @jsx React.DOM */
/**
 * Input
 *
 * @param {String} example  <p>
        <Input value="Valid Text Input" />
        <Input value="Invalid Text Input" isValid={false} />
    </p>
 */
var React = require('react');
var Radio = React.createClass({
    displayName: 'Radio',
    propTypes: {
        // value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        // onChange: React.PropTypes.func.isRequired,
        // onFocus: React.PropTypes.func,
        // readonly: React.PropTypes.bool,
        // isValid: React.PropTypes.bool,
        // type: React.PropTypes.string
    },
    getDefaultProps: function() {
    },
    render: function() {
        var classes = new React.addons.ClassBuilder('Radio');
        
        return (
            <label className={classes.className}>
                <input className="Radio_input" type="radio" name={this.props.name} value={this.props.value} checked={this.props.defaultChecked}/>
                <div className="Radio_content">{this.props.children}</div>
            </label>
        );
    }
});

module.exports = Radio;