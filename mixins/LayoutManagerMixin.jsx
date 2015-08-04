console.warn('Warning LayoutManagerMixin.jsx will be deprecated in the next minor version.');
/*global window */
var EventEmitter = require('../utils/EventEmitter');

var LayoutManagerMixin = {
    componentDidMount: function() {
        EventEmitter.on('currentPosition:change', this.onCurrentPositionChange);
    },
    componentWillUnmount: function() {
        EventEmitter.removeListener('currentPosition:change', this.onCurrentPositionChange);
    },
    onCurrentPositionChange: function(nextPosition) {
        if (nextPosition !== this.state.currentPosition) {
            this.setState({currentPosition: nextPosition});
        }
    },
    LayoutManagerMixin_back: function() {
        // var nextPosition = this.state.currentPosition-1;

        // // Don't let it be less than position 1
        // nextPosition = nextPosition < 1 ? 1 : nextPosition;
        // EventEmitter.emit('currentPosition:change', nextPosition);

        if (typeof window !== 'undefined') {
            window.history.back();
        }
    },
    LayoutManagerMixin_setPosition: function(nextPosition) {
        EventEmitter.emit('currentPosition:change', nextPosition);
    }
};

module.exports = LayoutManagerMixin;
