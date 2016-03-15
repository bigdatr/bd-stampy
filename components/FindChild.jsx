
/*
* FindChild.jsx
* A higher order component that provides "findChild" and "findChildIndex" functions as props
*
* the findChild function returns a child component based on an index or on a matching prop
*
* Arguments
* @selector: selector can be:
* + a number, where the number refers to the index of the child to return (0, 1, 2...)
* + a string, where the string corresponds to a prop on the child to return
* + a non-zero falsey value or an invalid  number or string will return null
*
* @identifierProp
* The prop on the child to match against, defaults to "name"
*
*
* the findChildIndex function does the same but returns the index of that child element, or -1 if not found
*/

import React, { Component, PropTypes } from 'react';

export default (ComposedComponent) => class extends Component {

    findChildIndex(selector, identifierProp = "name") {
        var children = this.props.children;
        if(Number.isInteger(selector)) {
            // selector is a number, make sure it's in bounds
            if(selector >= 0 && selector < children.length) {
                return selector;
            }
            return -1;
        }

        if(typeof selector == "string") {
            // selector is a string, find the matching child object and its id by using its name prop
            var foundChildIndex = -1;
            React.Children.map(children, (kid, i) => {
                if(kid.props[identifierProp] == selector) {
                    foundChildIndex = i;
                }
            });
            return foundChildIndex;
        }

        return -1;
    }

    findChild(selector, identifierProp = "name") {
        var childIndex = this.findChildIndex(selector, identifierProp);
        return childIndex != -1 ? this.props.children[childIndex] : null;
    }

    render() {
        return <ComposedComponent
                    {...this.props}
                    findChild={this.findChild.bind(this)}
                    findChildIndex={this.findChildIndex.bind(this)}
                />;
    }
};