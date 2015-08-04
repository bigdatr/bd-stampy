var React = require('react');
var Router = require('react-router');
var {Route, DefaultRoute, NotFoundRoute, RouteHandler} = Router;

var AppHandler = require('./AppHandler');
var ComponentsView = require('./ComponentsView');

var routes = (
    <Route handler={AppHandler} path="/">
        <DefaultRoute handler={ComponentsView} />
    </Route>
);

module.exports = routes;
