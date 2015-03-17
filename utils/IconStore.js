/* global window, document */

// TODO: Add default/missing icon path
var _DEFAULT_ICON_PATH = ['M0 0Z'];
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
            var _nodes = document.getElementById(iconName).childNodes;

        	var path = Array.prototype.slice
                            .call(_nodes)
                            .map(function(pp){
                                return pp.getAttribute('d');
                            });

	        _paths[iconName] = path;

	        return path;
        }
        catch(err) {
        	console.warn('bd-stampy/Icon.jsx', 'Could not find svg path for `' + iconName + '`');
            return _DEFAULT_ICON_PATH;
        }
	}
};

module.exports = IconStore;
