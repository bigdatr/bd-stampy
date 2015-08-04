console.warn('Warning StoreMixin.jsx will be deprecated in the next minor version.');
var StoreMixin = {
    updateState: function(key, value) {
    	// console.warn('StoreMixin:updateState', 'DEPRECATED');
        var state = {};
        state[key] = value;
        state[key + 'Fetching'] = false;

        setTimeout(function() {
        	this.setState(state);
        }.bind(this), 10);
    }
};

module.exports = StoreMixin;
