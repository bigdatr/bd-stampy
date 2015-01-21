/** @jsx React.DOM */
var React = require('react'),
    moment = require('moment');

var ClassBuilder = require('../utils/ClassBuilder');

var Datetime = React.createClass({
    displayName: 'Datetime',
    mixins: [],
    propTypes: {
        format: React.PropTypes.string,
        color: React.PropTypes.string,
        timeAgo: React.PropTypes.bool,
        timeSensitive: React.PropTypes.bool,
        value: React.PropTypes.number,
        nowrap: React.PropTypes.bool,
        type: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            format: 'YYYY-MM-DD',
            color: 'blue'
        };
    },
    render: function() {
        var divs;
        
        if (this.props.timeSensitive) {
            if(moment().subtract(1, 'days').isAfter(this.props.value || this.props.children)){
                this.props.color = 'red';
            }  
        }
        

        var classes = new ClassBuilder('Datetime')
            .modifier(this.props.type)
            .is(this.props.nowrap, 'nowrap')
            .add(this.props.color, 't-'+this.props.color)
        ;
        
        if (this.props.type === 'stacked') {
            var currentYear = this.formatDate('format', new Date(), 'YYYY');
            var testYear = this.formatDate('format', this.props.value || this.props.children, 'YYYY');

            var top, bottom;
            if (currentYear < testYear || currentYear > testYear) {
                top = this.renderDateString('MMM');
                bottom = this.renderDateString('YYYY');
            } else {
                top = this.renderDateString('D');  
                bottom = this.renderDateString('MMM');
            }
        
            return (
                <div className={classes.className} {...this.props}>
                    <strong className="Datetime_day">{top}</strong>
                    <div className="Datetime_month">{bottom}</div>
                </div>
            );
        } else {
            return (
                <span className={classes.className} {...this.props}>{this.renderDateString(this.props.format)}</span>
            );
        }
        
    },
    renderDateString:function(format){
        var d = moment(this.props.value || this.props.children);

        if (format === 'calendar') {
            return d.calendar();
        }
        else if(this.props.timeAgo) {
            return d.fromNow();
        }
        else {
            return d.format(format);
        }
    }
});

module.exports = Datetime;