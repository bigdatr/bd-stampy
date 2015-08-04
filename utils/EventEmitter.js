console.warn('Warning EventEmitter.js will be deprecated in the next minor version.');
var EventEmitter = require('events').EventEmitter;

module.exports = new EventEmitter();
