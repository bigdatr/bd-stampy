/** @jsx React.DOM */
/*global document */

var React = require('react'),
    moment = require('moment'),
    _ = require('lodash');

var Input = require('./Input.jsx');
var Icon = require('./Icon.jsx');

var ClassMixin = require('../mixins/ClassMixin.jsx'),
    ClassBuilder = require('../utils/ClassBuilder');


var DatePicker = React.createClass({
    displayName: 'DatePicker',
    mixins: [ClassMixin],
    propTypes: {
        name: React.PropTypes.string.isRequired,
        modalManager: React.PropTypes.func,
        onChange: React.PropTypes.func,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    },
    getDefaultProps: function() {
        return {
            displayDate: moment(),
            value: null,
            isValid: true
        };
    },
    getInitialState: function() {
        return {
            displayDate: moment(this.props.displayDate || new Date()),
            visible: false,
            value: this.props.value ? parseInt(this.props.value, 10) : null
        };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.value !== this.props.value) {
            var d = parseInt(nextProps.value, 10);

            this.setState({
                displayDate: moment(d || new Date()),
                value: d
            });
        }
    },
    // componentWillMount: function() {
        
    // },
    // componentWillUnmount: function() {
        
    // },
    onMouseDown: function () {
        this.isMouseOnDatePicker = true;
    },
    onMouseUp: function () {
        this.isMouseOnDatePicker = false;
    },
    onFocus: function() {
        document.addEventListener("mousedown", this.onClose, false);
        this.setState({visible: true});
        this.props.reactEvent = true;   
    },
    onClose: function () {
        document.removeEventListener("mousedown", this.onClose, false);
        if(this.isMouseOnDatePicker) {            
            return;
        }
        this.setState({visible: false});
    },
    onBlur: function(ee) {
        if(ee.relatedTarget) {
            this.setState({visible: false});
        }
    },
    onSelectDay: function(day, e) {

        var value = day.toDate().getTime();

        if (this.props.onChange) {
            this.props.onChange(e, {
                key: this.props.name,
                value: value
            });
        }
        this.setState({visible: false, value: value});
    },
    onDateShift: function(unit, direction, e) {
        e.preventDefault();
        var displayDate = this.state.displayDate;

        if (direction === 1) {
            displayDate.add(1, unit);
        }
        else {
            displayDate.subtract(1, unit);
        }

        this.setState({displayDate: displayDate});
    },
    onClearDate: function (e) {
        this.setState({value: ''});

        if (this.props.onChange) {
            this.props.onChange(e, {
                key: this.props.name,
                value: ''
            });
        }
    },
    render: function() {
        var classes = this.ClassMixin_getClass(),
            value = this.state.value ? moment(this.state.value).format('D MMM YY') : '';

        classes.add(!this.props.isValid, 'is-error');

        var datePicker = (this.state.visible && !this.props.alternateRender) ? this.renderDatePicker() : null;
        return (
            <div className={classes.className} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <Input className="DatePicker_input" readOnly={true} ref="input" name={this.props.name} onBlur={this.onBlur} placeholder={this.props.placeholder} onFocus={this.onFocus} value={value} isValid={this.props.isValid} discreteValue onChange={this.onClearDate}/>
                {datePicker}
            </div>
        );
    },
    renderDatePicker: function () {   
        return (
            <div className="DatePicker_selector">
                <Icon name="cross" modifier="toolbar" className="DatePicker_close" onMouseDown={this.onClose}></Icon>
                {this.renderSelectorPeriodMonth()}
                {this.renderSelectorPeriodYear()}
                {this.renderCalendar()}
            </div>
        );
    },
    renderSelectorPeriodMonth: function() {
        return (
            <div className="DatePicker_month">
                <Icon name="chevronback" size="small" onMouseDown={this.onDateShift.bind(this, 'month', -1)}/>
                <span className="DatePicker_text">{this.state.displayDate.format('MMMM')}</span>
                <Icon name="chevronforward" size="small" onMouseDown={this.onDateShift.bind(this, 'month', 1)}/>
            </div>
        );
    },
    renderSelectorPeriodYear: function() {
        return (
            <div className="DatePicker_year">
                <Icon name="chevronback" size="small" onMouseDown={this.onDateShift.bind(this, 'year', -1)}/>
                <span className="DatePicker_text">{this.state.displayDate.format('YYYY')}</span>
                <Icon name="chevronforward" size="small" onMouseDown={this.onDateShift.bind(this, 'year', 1)}/>
            </div>
        );
    },
    renderCalendar: function() {
        return (
            <table className="DatePicker_calendar">
                <thead>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                    <th>Sun</th>
                </thead>
                <tbody>
                    {this.renderMonth()}
                </tbody>
            </table>
        );
    },
    renderMonth: function() {
        var displayDate = moment(this.state.displayDate);

        var startOfMonth = moment(displayDate).startOf('month'),
            endOfMonth = moment(displayDate).endOf('month'),
            firstDay = startOfMonth.format('ddd'),
            calendarOffset = 0;
    
        // Calculate offset at start of calendar
        _.find(moment.weekdaysShort(), function(w, i) {
            if (w === firstDay) {
                calendarOffset = i;
                return true;
            }

            return false;
        });
        
        var startOfWeek = startOfMonth.subtract(calendarOffset-1, 'days'),
            weeks = [];

        while (startOfWeek.isBefore(endOfMonth)) {
            weeks.push({start: moment(startOfWeek)});
            startOfWeek.add(7, 'days');
        }

        return weeks.map(this.renderWeek);
    },
    renderWeek: function(week, rowIndex) {
        var days = [],
            today = moment().startOf('day'),
            displayDate = moment(this.state.displayDate),
            selected = this.state.value ? moment(this.state.value) : null;

        for (var i=0, l=7; i < l; i++) {
            var day = moment(week.start);

            var classes = new ClassBuilder().add(day.format('ddd') === 'Sun' || day.format('ddd') === 'Sat', 'is-weekend')
                                            .add(!day.isSame(displayDate, 'month'), 'is-otherMonth')
                                            .add(day.isSame(today), 'today')
                                            .add(selected && day.isSame(selected), 'selected');

            days.push(<td key={i} className={classes.className} onMouseDown={this.onSelectDay.bind(this, day)}>{day.format('D')}</td>);

            week.start.add(1, 'days');
        }

        return <tr key={rowIndex}>{days}</tr>;
    }
});

module.exports = DatePicker;