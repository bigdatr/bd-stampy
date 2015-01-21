var environment = {
	type: 'server'
};

if (typeof module === 'undefined' && typeof module.exports === 'undefined') {
	environment.type = 'browser';
}

module.exports = environment;