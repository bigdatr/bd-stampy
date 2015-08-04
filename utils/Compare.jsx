
//
// Tools for comparing objects in certain ways
//

var _ = require('lodash');

var Compare = {

    // Only test standard props. Ignore objects and arrays
    shallowNotEqual: function (a, b) {
        return (!_.isObject(a) && a !== b);
    },
    array: function (a, b){
        return _.difference(a, b).length > 0;
    }
};

module.exports = Compare;
