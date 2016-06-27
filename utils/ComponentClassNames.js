/*
Classnames is used in a common pattern across all toyota-styles components
This wraps that usage up in a function

props - pass in the components props (className and modifier will be used if found)
name - a string, the class name of the component that will be prefixed before modifiers
additionalModifiers - 

*/

import classnames from 'classnames';

const componentClassNames = (props, name, additionalModifiers, ...additionalClassnamesArguments) => {

	function createModifiers(modifiers) {
		if(Array.isArray(modifiers)) {
			return modifiers.map(cc => `${name}-${cc}`);
		}

		if(typeof modifiers == "string") {
			return modifiers.split(' ').map(cc => `${name}-${cc}`);
		}

		if(typeof modifiers == "object") {
			return Object.keys(modifiers).reduce((renamedModifiers, key) => {
				renamedModifiers[`${name}-${key}`] = modifiers[key]
				return renamedModifiers;
			},{});
		}
		return null;
	}

	return classnames(
	    name, 
	    createModifiers(props.modifier),
	    createModifiers(additionalModifiers),
	    props.className,
	    ...additionalClassnamesArguments
	);
};

export default componentClassNames;