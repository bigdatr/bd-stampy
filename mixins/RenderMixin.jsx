
var Loader = require('../components/Loader.jsx');

var RenderMixin = {
    RenderMixin_load: function (data, callback) {
        if (data.length < 1) {
            return <Loader></Loader>;
        }
        return callback;
    }
};

module.exports = RenderMixin;