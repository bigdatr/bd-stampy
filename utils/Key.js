/*eslint-disable */

var _SpecialKeys = {
    backspace: 8,
    tab: 9,
    clear: 12,
    enter: 13,
    'return': 13,
    esc: 27,
    escape: 27,
    space: 32,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    del: 46,
    'delete': 46,
    home: 36,
    end: 35,
    pageup: 33,
    pagedown: 34,
    ',': 188,
    '.': 190,
    '/': 191,
    '`': 192,
    '-': 189,
    '=': 187,
    ';': 186,
    '\'': 222,
    '[': 219,
    ']': 221,
    '\\': 220
};

var Key = {
    code: function (key) {
        return _SpecialKeys[key] || key.toUpperCase().charCodeAt(0);
    },
    isPressed: function (e, key) {
        return e.keyCode === Key.code(key);
    }
};

module.exports = Key;