/*eslint-disable */
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var BrowserHistory = require('../utils/BrowserHistory');
var urlPattern = require('url-pattern');

var UrlStore = function () {};

util.inherits(UrlStore, EventEmitter);

Object.assign(UrlStore.prototype, {
    _onRouteChange: function(route) {
        // console.debug('route:change', route);
        this.emit('route:change');
    },
    navigate: function(path, options) {
        options = options || {};
        return BrowserHistory.navigate(path, options);
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
                var val;
                if (typeof p.value === 'object' && p.value.length) {
                    // Convert arrays to pipe delimited strings
                    val = p.value
                        .map(function(f) {
                            return encodeURIComponent(f);
                        })
                        .join('|');
                } else {
                    val = encodeURIComponent(p.value);
                }
                return p.key + '=' + val;
            })
            .join('&');

        return queryString.length > 0 ? queryString : '';
    },
    getQueryString: function() {
        return BrowserHistory.getQueryString();
    },
    getQueryParams: function() {
        var queryString = this.getQueryString();

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
        var _toParams = Object.assign({}, params, currentParams);

        // // Ignore all null values
        var nextParams = {};
        for(var k in _toParams) {
            var v = _toParams[k];
            if (k !== '' && v) {
                nextParams[k] = v;
            }
        }

        var currentQueryString = BrowserHistory.getQueryString();
        var nextQueryString = this.paramsToQueryString(nextParams);

        // console.log(nextQueryString);

        if (currentQueryString !== nextQueryString) {
            var nextPath = '#' + BrowserHistory.getHash();

            if (nextQueryString !== '') {
                nextPath += '?' + nextQueryString;
            }

            var options = Object.assign({}, config || {}, {
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
        var hash = this.getHash();

        if (hash === '') {
            return '';
        }

        var fragments = hash.split('/');

        return fragments[0];
    },
    patternMatch: function(str) {
        var pattern = new urlPattern(str);
        return pattern.match(this.getHash());
    }

});

var _instance = new UrlStore();

BrowserHistory.onRouteChange(_instance._onRouteChange.bind(_instance));

module.exports = _instance;
