console.warn('Warning Dates.js will be deprecated in the next minor version.');
var moment = require('moment');

var Dates = {
    humanRange: function (first, last) {
        var firstDate = moment(first);
        var lastDate = moment(last);

        var lastFormatString = 'DD MMM YYYY';
        var fistFormatString = lastFormatString;

        if(firstDate.year() === lastDate.year()) {
            fistFormatString = 'DD MMM';

            if (firstDate.month() === lastDate.month()) {
                fistFormatString = 'DD';
            }
        }

        return firstDate.format(fistFormatString) + ' - ' + lastDate.format(lastFormatString);
    }
};

module.exports = Dates;
