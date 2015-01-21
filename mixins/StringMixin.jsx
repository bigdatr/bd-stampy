
var StringMixin = {
    sentenceify: function(string, delimiter) {
        return string.split(delimiter).join(' ');
    }
};

module.exports = StringMixin;