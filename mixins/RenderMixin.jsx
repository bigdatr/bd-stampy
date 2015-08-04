console.warn('Warning RenderMixin.jsx will be deprecated in the next minor version.');
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
