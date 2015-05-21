
var React = require('react'),
    _ = require('lodash'),
    BrowserHistory = require('../utils/History'),
    UrlStore = require('../utils/UrlStore');


function getRoutes(routes) {
    return _.map(routes || [], function (r) {
        return r.split('/');
    });
}

function getHashParams(hash) {
    if (hash && hash !== '') {
        
        // Ignore query string
        if (hash.indexOf('?') !== -1) {
            hash = hash.split('?')[0];
        }

        return hash.split('/');
    }

    return [];
}

function getParams(routes, hashes) {
    var route = {},
        isMatch = true;

    _.find(routes, function (r) {
        if (hashes.length === r.length) {
            _.forEach(r, function (param, i) {
                if (param[0] === ':') {
                    route[param.substr(1, param.length)] = decodeURIComponent(hashes[i]);
                } else if (param !== hashes[i]) {
                    isMatch = false;
                    route = {};
                }
            });
            return isMatch;
        }
        return false;
    });

    return route;
}

function getRouteHistory(history, nextState) {
    if (history.length > 1) {
        // Assuming that this function isn't triggered unless the
        // url/hash actually changes, it would be impossible to navigate
        // to the same url that you are so. Therefor, if the previous url is
        // the same as the next state, then the user has clicked the back button
        if (history[history.length - 2] === nextState.hash) {
            history.pop();
        }
        else {
            history.push(nextState.hash);
        }
    }
    else {
        history.push(nextState.hash);
    }

    return history;
}

function getRouteState(hash, _routes, history) {
    if (!hash && typeof window !== 'undefined') {
        hash = BrowserHistory.location.hash;
        
    }

    var route = {},
        hashes = getHashParams(hash),
        routes;

    if (_routes) {
        routes = getRoutes(_routes);
        route = getParams(routes, hashes);
    }

    var state = {
        hash: hash,
        route: route,
        route_base: hashes[0] || '#',
        queryString: UrlStore.getQueryParams() || {}

    };

    state.route_history = getRouteHistory(history, state);

    return state;
}

var RouteMixin = {
    propTypes: {         
        hash: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            hash: null
        };
    },
    getInitialState: function () {
        return getRouteState(this.props.hash, this.routes, []);
    },
    componentDidMount: function () {
        if (this.updateHash) {
            this.RouteMixin_route_handler = BrowserHistory.route({test: function () { return true; }}, this.RouteMixin_updateHash);
        }

        if (!BrowserHistory.isStarted()) {
            BrowserHistory.start();
        }

        console.warn('bd-stampy::RouteMixin', 'This mixin will be deprecated soon');
    },
    componentWillUnmount: function () {
        if (this.updateHash && this.RouteMixin_route_handler) {
            console.warn('Need to remove this route handler', this.RouteMixin_route_handler);
        }
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.hash && nextProps.hash !== this.props.hash) {
            this.RouteMixin_updateHash(nextProps.hash);
        }
    },
    RouteMixin_updateHash: function (hash) {
        // Add a hash to the start if it doesn't already have one
        hash = hash[0] !== '#' ? '#' + hash : hash;

        var state = getRouteState(hash, this.routes, this.state.route_history);

        if (this.routeStateWillUpdate) {
            state = this.routeStateWillUpdate(state) || state;
        }

        if (this.isMounted()) {
            this.setState(state, function() {
                if (this.routeStateDidUpdate) {
                    this.routeStateDidUpdate();
                }
            }.bind(this));
        }
    }
};

module.exports = RouteMixin;