/*eslint-disable */

var ClassBuilder = function (baseName) {
    this.displayName = baseName || '';
    this.className = baseName || '';
    this.baseName = baseName;
};

ClassBuilder.prototype.add = function (condition, passClass, failClass) {
    if(condition !== undefined) {
        if (passClass) {
            if (condition) {
                this.className += ' ' + passClass;
            }
            else if (failClass) {
                this.className += ' ' + failClass;
            }
        }
        else {
            this.className += ' ' + condition;
        } 
    }
    
    return this;
};

ClassBuilder.prototype.modifier = function (str) {
    if (str) {
        this.add(this.displayName + '-' + str);
    }
    return this;
};

ClassBuilder.prototype.is = function (condition, name) {
    var str = ' is-' + name || condition;
    if (condition) {
        this.className += str;
    } else {
        this.className = this.className.replace(str, '');
    }
    return this;
};

ClassBuilder.prototype.child = function (name) {
    return this.baseName + '_' + name;
};

module.exports = ClassBuilder;