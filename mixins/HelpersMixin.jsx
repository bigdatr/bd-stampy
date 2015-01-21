var HelpersMixin = {
    getIconNode: function(icon) {
    	console.warn('::HelpersMixin:getIconNode', 'has not been implemented correctly for server side rendering');
    	return icon;
        // var el = document.createElement('div');
        // el.innerHTML = icon;

        // return el.childNodes[0].nodeValue;
    }
};

module.exports = HelpersMixin;