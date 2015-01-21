var util = require('util');
var EventEmitter = require('events').EventEmitter;
var BrowserHistory = require('../utils/History');

var Url = require('./Url');

var UrlStore = function () {};

util.inherits(UrlStore, EventEmitter);

UrlStore.prototype.getQueryParams = function() {
    return Url.getQueryParams();
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
