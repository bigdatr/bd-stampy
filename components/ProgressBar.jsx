
var React = require('react');
var Color = require('../utils/Color.jsx');

var ProgressBar = React.createClass({
    displayName: 'ProgressBar',
    propTypes: {
        value: React.PropTypes.number,
        color: React.PropTypes.string,
        width: React.PropTypes.string,
        colorTo: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            value: 0,
            color: 'hero',
            width: '100%'
        };
    },
    render: function() {
        var barStyle = {
            backgroundColor:    this.renderColor(),
            width:              this.props.value + '%',
            transitionDuration: this.props.duration
        };

        return (
            <div className={"ProgressBar " + this.props.className} style={{width: this.props.width}}>
                <div className="ProgressBar_color" style={barStyle}></div>
            </div>
        );
    },
    renderColor: function () {
        var returnColor;
        var startColor = Color(this.props.color);


        if(this.props.colorTo) {
            returnColor = startColor.mix(Color(this.props.colorTo), this.props.value / 100);
        } else {
            returnColor = startColor;
        }

        return returnColor.hexString();
    }
});

module.exports = ProgressBar;