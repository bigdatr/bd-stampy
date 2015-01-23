var util = require('util');
var EventEmitter = require('events').EventEmitter;
var BrowserHistory = require('../utils/BrowserHistory');
var _ = require('lodash');

var UrlStore = function () {};

util.inherits(UrlStore, EventEmitter);

UrlStore.prototype = _.defaults(UrlStore.prototype, {
    _onRouteChange: function(route) {
        this.emit('route:change');
    },
    queryStringToParams: function(queryString) {
        var params = {};

        queryString
            .split('&')
            .forEach(function(q) {
                var pair = q.split('=');

                if (pair[1] === 'true' || pair[1] === 'false') {
                    // Convert true/false to boolean's
                    params[pair[0]] = (pair[1] === 'true');
                }
                else {
                    params[pair[0]] = decodeURIComponent(pair[1]);
                }
                
            });

        return params;
    },
    paramsToQueryString: function(params) {
        // Add params to an array so they can be sorted
        var paramList = [];

        _.forIn(params, function(v, k) {
            paramList.push({key: k, value: v});
        });

        var queryString = _.chain(paramList)
                            .sortBy(function(p) { return p.key; })
                            .map(function(p) { return p.key + '=' + encodeURIComponent(p.value); })
                            .join('&')
                            .value();

        return queryString.length > 0 ? queryString : '';
    },
    getQueryParams: function() {
        var queryString = BrowserHistory.getQueryString();

        if (!queryString || queryString === '') {
            return {};
        }

        return this.queryStringToParams(queryString);
    },
    setQueryParams: function(params, config) {
        if (!params || typeof params !== 'object') {
            console.warn('::UrlStore.setQueryParams', 'Missing or invalid argument `params`.', params || '');
            return false;
        }

        var currentParams = this.getQueryParams();

        // // Merge existing parameters with those which have been provided
        var _toParams = _.defaults(params, currentParams);

        // // Ignore all null values
        var nextParams = {};
        _.forIn(_toParams, function(v, k) {
            if (k !== '' && v) {
                nextParams[k] = v;
            }
        });

        var currentQueryString = BrowserHistory.getQueryString();
        var nextQueryString = this.paramsToQueryString(nextParams);

        if (currentQueryString !== nextQueryString) {
            var nextPath = '#' + BrowserHistory.getHash();

            if (nextQueryString !== '') {
                nextPath += '?' + nextQueryString;
            }

            var options = _.defaults(config || {}, {
                addHistoryEvent: true,      // Create a new event in the browser's history
                trigger: true
            });

            BrowserHistory.navigate(nextPath, {
                trigger: options.trigger,
                replace: !options.addHistoryEvent
            });

            return true;
        }

        return false;
    },
    getHash: function () {
        return BrowserHistory.getHash();
    },
    getRouteBase: function () {
        var hash = BrowserHistory.getHash();

        if (hash && hash !== '') {
            
            // Ignore query string
            if (hash.indexOf('?') !== -1) {
                hash = hash.split('?')[0];
            }

            hash = hash.split('/');
        }

        return hash[0] || '#';
    }
});

var _instance = new UrlStore();

BrowserHistory.onRouteChange(_instance._onRouteChange.bind(_instance));

module.exports = _instance;
