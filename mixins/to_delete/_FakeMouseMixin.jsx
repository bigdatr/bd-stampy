var FakeMouseMixin = {
    onTouchStart: function (event) {
        event.preventDefault();

        if (event.touches && event.touches.length === 1) {
            this.onMouseDown(event);
        }
    },
    onTouchMove: function (event) {
        event.preventDefault();
        this.onMouseMove(event);
    },
    onTouchEnd: function (event) {
        event.preventDefault();

        if (event.touches && event.touches.length === 0) {
            this.onMouseUp(event);
        }
    },
    componentDidMount: function (rootNode) {
        // First touch maps to mouse
        this.getDOMNode().addEventListener("touchstart", this.onTouchStart);
        this.getDOMNode().addEventListener("touchmove", this.onTouchMove);
        this.getDOMNode().addEventListener("touchend", this.onTouchEnd);
        this.getDOMNode().addEventListener("touchcancel", this.onTouchEnd);
    }
};

module.exports = FakeMouseMixin;
