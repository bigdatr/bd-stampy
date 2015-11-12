// require all `test/components/**/index.js`
const testsContext = require.context('./__tests__/', true, /\.js$/);
testsContext.keys().forEach(testsContext);

// require all `src/components/**/index.js`
const componentsContext = require.context('./components/', true, /\.jsx?$/);
componentsContext.keys().forEach(componentsContext);

const mixinsContext = require.context('./mixins/', true, /\.jsx?$/);
mixinsContext.keys().forEach(mixinsContext);

const utilsContext = require.context('./utils/', true, /\.jsx?$/);
utilsContext.keys().forEach(utilsContext);
