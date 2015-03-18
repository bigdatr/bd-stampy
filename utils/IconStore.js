/* global window, document */

// TODO: Add default/missing icon path
var _DEFAULT_ICON_PATH = ['M12 12 h 24 v 24 h -24 Z'];
var _paths = {};

var IconStore = {
	getPaths: function(iconName) {
		if (_paths[iconName]) {
			return _paths[iconName];
		}

		if (typeof window === 'undefined') {
            return _DEFAULT_ICON_PATH;
        }

        try {

        	var path = Array.prototype.slice.call(document.getElementById(iconName).childNodes).map(function(pp){
                return pp.getAttribute('d');
            });

	        _paths[iconName] = path;

	        return path;
        }
        catch(err) {
            return _DEFAULT_ICON_PATH;
        }
	}
};

module.exports = IconStore;
