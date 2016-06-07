/*
Classnames is used in a common pattern across all toyota-styles components
This wraps that usage up in a function
*/

import classnames from 'classnames';

const componentClassNames = (name, props, ...additionalClassnamesArguments) => classnames(
    name, 
    props.modifier ? props.modifier.split(' ').map(cc => `${name}-${cc}`) : null,
    props.className,
    ...additionalClassnamesArguments
);

export default componentClassNames;