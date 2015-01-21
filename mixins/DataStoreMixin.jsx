var DataStoreMixin = {
    onDataUpdated: function(obj, data) {
        var state = {};
        state[obj] = data;

        if (this.onWillUpdateState) {
        	var s = this.onWillUpdateState(state);
        	state = s || state;
        }

        this.setState(state);
    },
};

module.exports = DataStoreMixin;