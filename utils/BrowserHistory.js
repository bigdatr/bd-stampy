/* global window */

var _History = require('../utils/History');

var BrowserHistory = function () {
    this._hash = '';
    this._url = '';
    this._query = '';
};

BrowserHistory.prototype = {
    onRouteChange: function(cb) {
        if (cb) {
            return _History.route({test: function () { return true; }}, cb);
        }
    },
    navigate: function(path, options) {
        return _History.navigate(path, options);
    },
    _updateUrl: function(forcedUrl) {
        var urlChanged = false;

        // Skip this if we are running server side
        if (forcedUrl) {
            this._url = forcedUrl;
            urlChanged = true;
        }
        else if (typeof window !== 'undefined' && !window.spyOn) {
            this._url = _History.location.hash;
            urlChanged = true;
        }

        if (urlChanged) {
            var h = this._url;

            // Remove hash prefix
            if (h.substr(0, 1) === '#') {
                h = h.substr(1, h.length-1);
            }

            // Remove any query params
            var parts = h.split('?');

            this._hash = parts[0];

            if (parts.length === 1 || parts[1] === '') {
                this._query = '';
            }
            else {
                this._query = parts[1];
            }
        }
    },
    setUrl: function(url) {
        var hashPosition = url.indexOf('#');

        if (hashPosition !== -1) {
            url = url.substr(hashPosition, url.length - hashPosition);
            this._updateUrl(url);
        }
    },
    getHash: function() {
        this._updateUrl();
        return this._hash;
    },
    getQueryString: function() {
        this._updateUrl();
        return this._query;
    }
};


module.exports = new BrowserHistory();
