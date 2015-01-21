/** @jsx React.DOM */
var NavMixin = {
	getInitialState: function() {
        return {
            addMask: false,
            side: 'closed'
        };
    },
    NavMixin_onNavToggle: function(nextSide) {

        var side = this.state.side,
            addMask = nextSide !== 'closed' ? true : false;

        if (side === nextSide) {
            side = 'closed';
            addMask = false;
        }
        else {
            side = nextSide;
        }

        this.setState({side: side, addMask: addMask});
    }
};

module.exports = NavMixin;
