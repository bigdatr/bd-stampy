import React, { Component, PropTypes } from 'react';
import Immutable, {fromJS} from 'immutable';

export default (propKeys, outputFunction) => (ComposedComponent) => {
    return class AutoRequest extends Component {
        componentWillMount() {
            outputFunction(this.props);
        }
        componentWillReceiveProps(nextProps) {
            // make props immutable Maps
            const thisPropsImmutable = fromJS(this.props);
            const nextPropsImmutable = fromJS(nextProps);

            const propsHaveChanged = fromJS(propKeys)
                .some(ii => {
                    const keyPath = ii.split('.');
                    return !Immutable.is(
                        thisPropsImmutable.getIn(keyPath),
                        nextPropsImmutable.getIn(keyPath)
                    );
                });

            if(propsHaveChanged) {
                outputFunction(nextProps);
            }
        }
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }
}
