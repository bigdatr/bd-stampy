import React, { Component, PropTypes } from 'react';
import { fromJS, List } from 'immutable';

//
// QueryStringProvider higher order component
// Allows you to pass a prop of the query string to this HOC's children and set or update the query string, and also allows for array parameters
// Provides the following props:
//
// + query - the object representing the query string. Change this props name using config.queryPropName
// + updateQuery - a function to updates only parts of the query at once. Good at not demolishing other query params not set by this component
// + setQuery - a function to set the query
//
// This higher order component accepts a single object to pass conguration options in
// Valid options are
// + queryPropName - optional string, sets the name of the query prop. Defaults to "query"
// + replaceState - optional boolean, setting this to true will make query changes use replaceState instead of pushState
// + arrayParams - optional array, if you have certain query parameters that you always want to return as arrays, name them in here
//   by default react-router only passes an array of query param values back if there are more than one
//   All arrayParams will also be an empty array if they are not present in the query string
//
// This component requires a location prop anmd history prop passed to it, which should be the location and history props that react router provides it's route components
// This will happen automatically if this HOC is used on any components used straight from <Route> objects
//

export default (config) => (ComposedComponent) => {

    const replaceState = config && config.replaceState;
    const queryPropName = (config && config.queryPropName) || "query";
    const arrayParams = (config && fromJS(config.arrayParams)) || List();

    class QueryStringProvider extends Component {

        constructor(props) {
            super(props);

            // explicit this bind until es7
            this.updateQuery = this.updateQuery.bind(this);
            this.setQuery = this.setQuery.bind(this);
        }

        // getQuery()
        // gets the query object

        getQuery() {
            const query = fromJS(this.props.location.query);

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
            const routerMethod = replaceState ? "replaceState" : "pushState";
            const newQuery = fromJS(query)
                .filter(ii => ii !== "")
                .toJS()

            this.props.history[routerMethod](null, this.props.location.pathname, newQuery);
        }

        // render()

        render() {
            const newProps = {
                [queryPropName]: this.getQuery(),
                setQuery: this.setQuery,
                updateQuery: this.updateQuery
            };
            return <ComposedComponent {...this.props} {...newProps} />;
        }
    }

    QueryStringProvider.propTypes = {
        location: PropTypes.object.isRequired, // must be react router location object
        history: PropTypes.object.isRequired // must be react router history object
    };

    return QueryStringProvider;
};