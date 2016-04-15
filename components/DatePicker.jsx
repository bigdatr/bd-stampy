
/*global document */

var React = require('react'),
    moment = require('moment'),
    _ = require('lodash');

var Input = require('./Input');

var ClassMixin = require('../mixins/ClassMixin.jsx'),
    ClassBuilder = require('../utils/ClassBuilder');

var DatePicker = React.createClass({
    displayName: 'DatePicker',
    mixins: [ClassMixin],
    propTypes: {
        name: React.PropTypes.string.isRequired,
        modalManager: React.PropTypes.func,
        onChange: React.PropTypes.func,
        nextButton: React.PropTypes.element,
        previousButton: React.PropTypes.element,
        closeButton: React.PropTypes.element,
        required: React.PropTypes.bool,
        value: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ]),
        disabled: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            displayDate: moment(),
            value: null,
            isValid: true,
            closeButton: <span>x</span>,
            nextButton: <span>&gt;</span>,
            previousButton: <span>&lt;</span>,
            min_date: null,
            max_date: null,
            required: false,
            disabled: false
        };
    },
    getInitialState: function() {
        return {
            displayDate: moment(this.props.displayDate || new Date()),
            visible: false,
            value: this.props.value
        };
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            displayDate: moment(this.props.value || new Date()),
            value: nextProps.value
        });
    },
    onKeyUp: function(e){
        if (e.keyCode === 27 ) { // esc
            e.stopPropagation();
            this.onClose();
            this.refs.input.blur();
        }
    },
    onMouseDown: function () {
        this.isMouseOnDatePicker = true;
    },
    onMouseUp: function () {
        this.isMouseOnDatePicker = false;
    },
    onFocus: function() {
        if (!this.props.disabled) {
            this.setState({visible: true});

            document.addEventListener("mousedown", this.onClose, false);
        }
    },
    onClose: function () {
        if (this.isMouseOnDatePicker) {
            return;
        }

        this.setState({visible: false});
        document.removeEventListener("mousedown", this.onClose, false);
    },
    onBlur: function(ee) {
        if(ee.relatedTarget) {
            this.setState({visible: false});
        }
    },
    onSelectDay: function(day, e) {
        if (!this.getIsInRange(day)) {
            return e.preventDefault();
        }

        var value = day.toDate().getTime();

        if (this.props.onChange) {
            this.props.onChange(e, {
                key: this.props.name,
                value: value
            });
        }

        this.setState({visible: false, value: value});

        this.refs.input.blur();
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
    onClearDate: function (e, details) {
        if(details.value === '') {
            this.setState({value: ''});
            if (this.props.onChange) {
                this.props.onChange(e, {
                    key: this.props.name,
                    value: ''
                });
            }
        }
    },
    getIsInRange: function(day) {
        var isInRange = true;

        if (this.props.min_date) {
            var min_date = moment(this.props.min_date).subtract(1, 'day');
            isInRange = day.isAfter(min_date);
        }

        if (isInRange && this.props.max_date) {
            var max_date = moment(this.props.max_date).add(1, 'day');
            isInRange = day.isBefore(max_date);
        }

        return isInRange;
    },
    render: function() {
        var classes = this.createClassName('DatePicker'),
            value = this.state.value ? moment(this.state.value).format('D MMM YY') : '';

        classes.add(!this.props.isValid, 'is-error');

        var datePicker = (this.state.visible && !this.props.alternateRender) ? this.renderDatePicker() : null;
        var closeIcon = this.props.required || this.props.disabled ?  null : this.props.closeValueIcon;

        return (
            <div className={classes.className} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
                <Input
                    className="DatePicker_input"
                    ref="input"
                    name={this.props.name}
                    onBlur={this.onBlur}
                    placeholder={this.props.placeholder}
                    onFocus={this.onFocus}
                    value={value}
                    isValid={this.props.isValid}
                    discreteValue
                    closeIcon={closeIcon}
                    onChange={this.onClearDate}
                    onKeyUp={this.onKeyUp}
                />
                {datePicker}
            </div>
        );
    },
    renderDatePicker: function () {
        return (
            <div className="DatePicker_selector">
                <div className="DatePicker_close" onMouseDown={this.onClose}>{this.props.closeButton}</div>
                {this.renderSelectorPeriodMonth()}
                {this.renderSelectorPeriodYear()}
                {this.renderCalendar()}
            </div>
        );
    },
    renderSelectorPeriodMonth: function() {
        var prevMonthButton;
        var prevMonth = moment(this.state.displayDate).subtract(1, 'month').endOf('month');

        if (this.getIsInRange(prevMonth)) {
            prevMonthButton = <span onMouseDown={this.onDateShift.bind(this, 'month', -1)}>{this.props.previousButton}</span>;
        }
        else {
            prevMonthButton = <span className="is-hidden">{this.props.previousButton}</span>;
        }

        var nextMonthButton;
        var nextMonth = moment(this.state.displayDate).add(1, 'month').startOf('month');

        if (this.getIsInRange(nextMonth)) {
            nextMonthButton = <span onMouseDown={this.onDateShift.bind(this, 'month', 1)}>{this.props.nextButton}</span>;
        }
        else {
            nextMonthButton = <span className="is-hidden">{this.props.nextButton}</span>;
        }

        return (
            <div className="DatePicker_month">
                {prevMonthButton}
                <span className="DatePicker_text">{this.state.displayDate.format('MMMM')}</span>
                {nextMonthButton}
            </div>
        );
    },
    renderSelectorPeriodYear: function() {
        var prevYearButton;
        var prevYear = moment(this.state.displayDate).subtract(1, 'year').endOf('year');

        if (this.getIsInRange(prevYear)) {
            prevYearButton = <span onMouseDown={this.onDateShift.bind(this, 'year', -1)}>{this.props.previousButton}</span>;
        }
        else {
            prevYearButton = <span className="is-hidden">{this.props.previousButton}</span>;
        }

        var nextYearButton;
        var nextYear = moment(this.state.displayDate).add(1, 'year').startOf('year');

        if (this.getIsInRange(nextYear)) {
            nextYearButton = <span onMouseDown={this.onDateShift.bind(this, 'year', 1)}>{this.props.nextButton}</span>;
        }
        else {
            nextYearButton = <span className="is-hidden">{this.props.nextButton}</span>;
        }

        return (
            <div className="DatePicker_year">
                {prevYearButton}
                <span className="DatePicker_text">{this.state.displayDate.format('YYYY')}</span>
                {nextYearButton}
            </div>
        );
    },
    renderCalendar: function() {
        return (
            <table className="DatePicker_calendar">
                <thead>
                    <tr>
                        <th>Mon</th>
                        <th>Tue</th>
                        <th>Wed</th>
                        <th>Thu</th>
                        <th>Fri</th>
                        <th>Sat</th>
                        <th>Sun</th>
                    </tr>
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

        var startOfWeek = moment(startOfMonth).subtract(calendarOffset-1, 'days'),
            weeks = [];

        // Ensure we always display the 1st, even if its not on a Sunday
        if (startOfMonth.isBefore(startOfWeek)) {
            startOfWeek.subtract(7, 'days');
        }

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
                                            .add(selected && day.isSame(selected), 'selected')
                                            .add(!this.getIsInRange(day), 'is-disabled');

            days.push(<td key={i} className={classes.className} onMouseDown={this.onSelectDay.bind(this, day)}>{day.format('D')}</td>);

            week.start.add(1, 'days');
        }

        return <tr key={rowIndex}>{days}</tr>;
    }
});

module.exports = DatePicker;
