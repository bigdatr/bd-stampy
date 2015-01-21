var util = require('util');
var EventEmitter = require('events').EventEmitter;
var BrowserHistory = require('../utils/History');

var Url = require('./Url');

var UrlStore = function () {};

util.inherits(UrlStore, EventEmitter);

UrlStore.prototype.getQueryParams = function() {
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
};

UrlStore.prototype.setQueryParams = function(params, config) {
    return Url.setState(params, config);
};

var _instance = new UrlStore();

function _onHashChange(route) {
    // console.debug('::UrlStore', 'route:change', route);
    _instance.emit('route:change');
}

BrowserHistory.route({test: function () { return true; }}, _onHashChange);

module.exports = _instance;
