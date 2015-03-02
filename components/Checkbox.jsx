var React = require('react');
var Input = require('./InputElement');

var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ClassMixin = require('../mixins/ClassMixin');

var Checkbox = React.createClass({
    displayName: 'Checkbox',
    propTypes: {
        checked: React.PropTypes.bool,
        onChange: React.PropTypes.func,
        boxColor: React.PropTypes.string,
        tickColor: React.PropTypes.string
    },
    mixins: [ClassMixin, PureRenderMixin],
    getDefaultProps: function () {
        return {
            boxColor: 'smoke',
            tickColor: 'hotpink'
        };
    },
    render: function () {
        return (
            <div className="Checkbox">
                <Input 
                    type="checkbox"
                    id={this.props.name}
                    name={this.props.name}
                    checked={this.props.checked}
                    defaultChecked={this.props.checked || false}
                    onChange={this.props.onChange}
                />
                  
                <label htmlFor={this.props.name}>
                    <span className="check" style={{borderColor: this.props.tickColor}} />
                    <span className="box" style={{borderColor: this.props.boxColor}} />
                    <span className="text">{this.props.children}</span>
                </label> 
            </div>
        );
    },
    
});

module.exports = Checkbox;