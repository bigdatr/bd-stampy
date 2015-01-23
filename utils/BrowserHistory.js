var _History = require('../utils/History');

var BrowserHistory = function () {
    this._hash = '';
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
    setUrl: function(url) {
        this._url = url;

        var urlComponents = url.split('#');

        if (urlComponents.length === 1) {
            this._hash = '';
        }
        else {
            this._hash = urlComponents[1];
        }
    },
    getHash: function() {
        console.log(typeof window !== 'undefined' , process);

        // Skip this if we are running server side
        if (typeof window !== 'undefined') {

            this._hash = _History.location.hash;
        }

        return this._hash;
    },
    getQueryString: function() {
        var hash = this.getHash();
        var hashComponents = hash.split('?');

        if (hashComponents.length === 1 || hashComponents[1] === '') {
            return '';
        }
        else {
            return hashComponents[1];
        }
    }
};


module.exports = new BrowserHistory();
