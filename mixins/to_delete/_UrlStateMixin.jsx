/*
    UrlStateMixin_params: {
        price: {initial: 0, parse: function(val) { return parseInt(val, 10)}}
    },
*/

var _ = require('lodash');
var Url = require('../utils/Url');

function paramsToArray(obj) {
    var params = [];

    for (var key in obj) {
        params.push({
            key: key,
            value: obj[key]
        });
    }

    return params;
}

var UrlStateMixin = {
    getInitialState: function() {
        var nextState = {};

        var state_params = this.UrlStateMixin_params;

        if (state_params) {
            var url_params = paramsToArray(Url.getQueryParams());
            state_params = paramsToArray(state_params);
            
            state_params.forEach(function(s) {
                var match = _.find(url_params, function(u) {
                    return s.key === u.key;
                });

                if (match) {
                    if (s.value.parse) {
                        nextState[s.key] = s.value.parse(match.value);
                    }
                    else {
                        nextState[s.key] = match.value;
                    }
                }
                else {
                    // Use default value
                    nextState[s.key] = s.value.initial;
                }
            });
        }

        return nextState;
    }
};

module.exports = UrlStateMixin;
