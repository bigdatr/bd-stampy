
var BrowserHistory = require('../utils/History');

var Url = {
    getQueryParams: function() {
        console.error('stampy/utils/Url.js', 'This module will be removed in a future release, use `UrlStore` instead.');

        if (typeof window === 'undefined') {
            return {};
        }

        var hash = BrowserHistory.location.hash;
        var hashComponents = hash.split('?');

        if (hashComponents.length === 1 || hashComponents[1] === '') {
            return {};
        }

        var params = {};

        hashComponents[1]
            .split('&')
            .forEach(function(q) {
                var pair = q.split('=');

                if(pair[1] === 'true' || pair[1] === 'false') {
                    // Convert true/false to boolean's
                    params[pair[0]] = (pair[1] === 'true');
                } else {
                    params[pair[0]] = decodeURIComponent(pair[1]);
                }
                
            });

        return params;
    },
    setState: function(params, config) {
        console.error('stampy/utils/Url.js', 'This module will be removed in a future release, use `UrlStore` instead.');

        params = params || {};

        var options = Object.assign({}, config || {}, {
            addHistoryEvent: true,      // Create a new event in the browser's history
            trigger: true
        });

        var hash = BrowserHistory.location.hash || '#';

        // Current State
        var currentParams = this.getQueryParams(),
            hashComponents = hash.split('?');

        // Merge existing parameters with those which have been provided
        params = Object.assign({}, params, currentParams);

        // Ignore all null values
        var nextParams = {};
        for(var k in params) {
            var v = params[k];
            if (k !== '' && v) {
                nextParams[k] = encodeURI(v);
            }
        }

        var currentBasePath = hashComponents[0],
            currentQueryString = '?' + hashComponents[1],
            nextQueryString = this.paramsToQuery(nextParams);

        if (currentQueryString !== nextQueryString) {
            var nextUrl = currentBasePath + nextQueryString;

            BrowserHistory.navigate(nextUrl, {trigger: options.trigger, replace: !options.addHistoryEvent});
        }
    },
    paramsToQuery: function(params) {
        // Sort the params
        var paramList = [];
        for(var k in params) {
            paramList.push({key: k, value: params[k]});
        }

        paramList.sort(function(a, b) {
            var x = a.key.toLowerCase();
            var y = b.key.toLowerCase();
            return x<y ? -1 : x>y ? 1 : 0;
        });

        var queryString = paramList
            .map(function(p) {
                return p.key + '=' + encodeURIComponent(p.value);
            })
            .join('&');

        return queryString.length > 0 ? queryString : '';
    }
};

module.exports = Url;