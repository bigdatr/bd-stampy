/*
Classnames is used in a common pattern across all toyota-styles components
This wraps that usage up in a function

props - pass in the components props (className and modifier props will be used if found)
name - a string, the class name of the component that will be prefixed before modifiers
additionalModifiers - more modifiers to include that will be prefixed just like props.modifiers.
                     Accepts the same kinds of data types as classnames() does: a space-delimited string, array of string, or object keys with boolean values
additionalClassnamesArguments - more class names to be applied. These wont be prefixed like modifiers are.
*/

import classnames from 'classnames';

const componentClassNames = (props, name, additionalModifiers, ...additionalClassnamesArguments) => {

	function createModifiers(modifiers) {
		if(!modifiers) {
			return null;
		}

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