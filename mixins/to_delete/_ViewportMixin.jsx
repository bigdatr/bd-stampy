var ViewportMixin = {
    // componentDidMount: function() {
    //     if (this.onResize) {
    //         window.addEventListener('resize', this.updateViewport);
    //     }
    // },
    // componentWillUnmount: function() {
    //     if (this.onResize) {
    //         window.removeEventListener('resize', this.updateViewport);
    //     }
    // },
    ViewportMixin_getMaxCols: function() {
        if (this.clientWidth < 768) {
            return 1;
        }

        return 2;
    },
    ViewportMixin_showMenu: function() {
        // return this.clientWidth > 768;
        return false;
    },
    ViewportMixin_updateViewport: function() {
        this.clientWidth = document.documentElement.clientWidth;
        this.clientHeight = document.documentElement.clientHeight;
        this.onResize();
    }
};

if (typeof window !== 'undefined') {
    ViewportMixin.retina = window.devicePixelRatio > 1;
    ViewportMixin.clientWidth = document.documentElement.clientWidth;
    ViewportMixin.clientHeight = document.documentElement.clientHeight;
}

module.exports = ViewportMixin;