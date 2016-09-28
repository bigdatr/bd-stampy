import React, { Component, PropTypes } from 'react';
import Immutable, { fromJS, List, Map } from 'immutable';
import AutoRequest from 'bd-stampy/components/AutoRequest';

//
// QueryStringProvider higher order component
// Allows you to get and set the query string object by providing a child component with props, using react-router. It also allows for array parameters.
// it provides the following props:
//
// + query - the object representing the query string. Change this props name using config.queryPropName
// + updateQuery - a function to updates only parts of the query at once. Good at not demolishing other query params not set by this component
// + setQuery - a function to set the query
//
// This higher order component accepts a config object to pass configuration options in
// Valid options are
// + defaultQuery - optional object, these defaults will be passed down in the query prop if they aren't present in the actual query string
// + queryPropName - optional string, sets the name of the query prop. Defaults to "query"
// + replaceState - optional boolean, setting this to true will make query changes use replaceState instead of pushState
// + arrayParams - optional array, if you have certain query parameters that you always want to return as arrays, name them in here
//   by default react-router only passes an array of query param values back if there are more than one
//   All arrayParams will also be an empty array if they are not present in the query string
//
// This higher order component's second argument is the onChangeFunction, which if provided will call onChangeFunction once on componentDidMount, 
// and each time the query changes after that. onChangeFunction will be passed 2 arguments: the current query object and a props object.
//
// This component requires a location prop, which should be the location pros that react router provides it's route components
// This will happen automatically if this HOC is used on any components being passed straight to <Route> objects
// If you're using react-router v1 then you'll also need to pass it a history prop that react-router provides
// If using react-router v2 then QueryStringProvider will automatically connect via context
//

export default (config, onChangeFunction) => (ComposedComponent) => {

    const replaceState = config && config.replaceState;
    const queryPropName = (config && config.queryPropName) || "query";
    const arrayParams = (config && fromJS(config.arrayParams)) || List();
    const defaultQuery = (config && fromJS(config.defaultQuery)) || Map();

    const PreparedComposedComponent = !onChangeFunction
        ? ComposedComponent
        : AutoRequest([queryPropName], (props) => {
            onChangeFunction(props[queryPropName], props);
        })(ComposedComponent);

    class QueryStringProvider extends Component {

        constructor(props) {
            super(props);

            // explicit this bind until es7
            this.updateQuery = this.updateQuery.bind(this);
            this.setQuery = this.setQuery.bind(this);
        }

        // getQuery()
        // gets the query object

        getQuery(props = this.props) {
            const query = defaultQuery.merge(fromJS(props.location.query));

            // ensures that all arrayParams are returned as arrays (not strings or blank)
            return arrayParams
                .reduce((query, arrayParamKey) => {
                    const param = query.get(arrayParamKey, List());
                    const arrayParamValue = List.isList(param) ? param : List([param]);
                    return query.set(arrayParamKey, arrayParamValue);
                }, query)
                .toJS();
        }

        // updateQuery()
        // partially updates the query - any keys on the objects passed in will be modified on the query object
        // keys set to empty strings will be removed from the query object

        updateQuery(queryParamsToUpdate) {
            const query = fromJS(this.props.location.query)
                .merge(fromJS(queryParamsToUpdate))
                .toJS();
            this.setQuery(query);
        }

        // setQuery()
        // sets entire query object at once
        // empty strings will be ignored and removed from the query string

        setQuery(query) {
            const routerMethod = replaceState ? "replace" : "push";
            const newQuery = fromJS(query)
                .filter(ii => ii !== "")
                .toJS();

            if(this.context.router) {
                // react router v2
                this.context.router[routerMethod]({
                    pathname: this.props.location.pathname,
                    query: newQuery
                });
            } else {
                // react router v1
                this.props.history[`${routerMethod}State`](null, this.props.location.pathname, newQuery);
            }
        }

        // render()

        render() {
            const newProps = {
                [queryPropName]: this.getQuery(),
                setQuery: this.setQuery,
                updateQuery: this.updateQuery
            };
            return <PreparedComposedComponent {...this.props} {...newProps} />;
        }
    }

    QueryStringProvider.propTypes = {
        location: PropTypes.object.isRequired, // must be react router location object
        history: PropTypes.object // must be react router history object, required for react-router v1
    };
    
    QueryStringProvider.contextTypes = {
        router: React.PropTypes.func // required for react-router v2
    };

    return QueryStringProvider;
};