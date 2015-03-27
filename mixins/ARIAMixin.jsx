var Key = require('../utils/Key');

var ARIAMixin = {
    ARIAMixin_onKeyDown(e) {
        if(Key.isPressed(e, 'space')) {
            e.preventDefault();
        }
    },
    ARIAMixin_onKeyUp(e) {
        if(Key.isPressed(e, 'space') && this.onClick) {
            this.onClick(e);
        }

    }
};

module.exports = ARIAMixin;
