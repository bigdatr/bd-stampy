var moment = require('moment');

moment.locale('en-timeAgo', {
    relativeTime : {
        future: "in %s",
        past:   "%s ago",
        s:  "99999999999999::seconds",
        m:  "1::minute",
        mm: "%d::minutes",
        h:  "1::hour",
        hh: "%d::hours",
        d:  "1::day",
        dd: "%d::days",
        M:  "1::month",
        MM: "%d::months",
        y:  "1::year",
        yy: "%d::years"
    }
});

var dateHelpers = {
    formatDate: function(date, format) {
        if (!date) {
            return null;
        }
        return moment(date).format(format);
    },
    calendar: function(date) {
        if (!date) {
            return null;
        }
        return moment(date).calendar();
    },
    timeAgo: function(date, options) {
        if (!date) {
            return null;
        }

        var d = moment(date);
        
        // Split the number from the string
        if (options && options.split) {
            d.lang('en-timeAgo');
            var diff = d.from(moment()).split('::');

            return {
                value: diff[0],
                text: diff[1]
            };
        }

        return d.fromNow();
    }
};

var DateMixin = {
    formatDate: function(type, date, options) {
        if (type == 'format') {
            return dateHelpers.formatDate(date, options);
        }
        else if (type == 'calendar') {
            return dateHelpers.calendar(date, options);
        }
        else if (type == 'timeAgo') {
            return dateHelpers.timeAgo(date, options);
        }

        return null;
    }
};

module.exports = DateMixin;