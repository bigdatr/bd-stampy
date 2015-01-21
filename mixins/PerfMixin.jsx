var PerfMixin = {
    componentWillUpdate: function() {
        // console.time(this.type.displayName);
        // React.addons.Perf.start();
    },
    componentDidUpdate: function() {
        // console.timeEnd(this.type.displayName);
        // React.addons.Perf.stop();
    }
};

module.exports = PerfMixin;
