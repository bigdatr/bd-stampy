/* global window, document */

var _paths = {};

var IconStore = {
	getPath: function(iconName) {
		if (_paths[iconName]) {
			return _paths[iconName];
		}
		
		if (typeof window === 'undefined') {
            return 'default path...';
        }

        var path = document.getElementById(iconName)
        					.getElementsByTagName('path')[0]
        					.getAttribute('d');

        _paths[iconName] = path;

        return path;
	}
};

module.exports = IconStore;