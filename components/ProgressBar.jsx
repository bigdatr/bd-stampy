var React = require('react');

var ProgressBar = React.createClass({
    displayName: 'ProgressBar',
    propTypes: {
        value: React.PropTypes.number,
        color: React.PropTypes.string,
        width: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            value: 0,
            color: 'hero',
            width: '100%'
        };
    },
    render: function() {
        if(this.props.colorTo) {
            console.warn('<ProgressBar colorTo={color}/> is no longer supported');
        }
        var barStyle = {
            backgroundColor:    this.props.color,
            width:              this.props.value + '%',
            transitionDuration: this.props.duration
        };

        return (
            <div className={"ProgressBar " + this.props.className} style={{width: this.props.width}}>
                <div className="ProgressBar_color" style={barStyle}></div>
            </div>
        );
    }
});

module.exports = ProgressBar;
