/*eslint-env commonjs*/
const testsContext = require.context('../src/', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

const componentsContext = require.context('../src/', true, /(?!\.(spec|mock))\.js$/);
componentsContext.keys().forEach(componentsContext);
