var env = require('../environment/environment');

// var prefix = (function () {
//     var styles = window.getComputedStyle(document.documentElement, ''),
//         pre = (Array.prototype.slice
//           .call(styles)
//           .join('') 
//           .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
//         )[1],
//         dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
//     console.log(dom);
//     return {
//         dom: dom,
//         lowercase: pre,
//         css: '-' + pre + '-',
//         js: pre[0].toUpperCase() + pre.substr(1)
//     };
// })();

var DeviceMixin = {
	devicetype: 'Desktop',
	getDefaultProps: function() {
		var a = navigator.userAgent;
        // this.prefix = prefix;
        if (a.indexOf('iPad') !== -1) {
            this.browser = 'Mobile Safari';
            this.device = 'iPad';
            this.vendorPrefix = '-webkit-';
            this.devicetype = 'Mobile';
        }
        else if (a.indexOf('iPhone') !== -1) {
            this.browser = 'Mobile Safari';
            this.device = 'iPhone';
            this.vendorPrefix = '-webkit-';
            this.devicetype = 'Mobile';
        }
        else if (a.indexOf('Android') !== -1) {
            this.browser = 'Mobile Chrome';
            this.device = 'Android';
            this.devicetype = 'Mobile';
        }
        else if (a.indexOf('Chrome') !== -1) {
            this.browser = 'Chrome';
            this.vendorPrefix = '-webkit-';
        }
        else if (a.indexOf('Safari') !== -1) {
            this.browser = 'Safari';
            this.vendorPrefix = '-webkit-';
        }
        else if (a.indexOf('MSIE') !== -1) {
            this.browser = 'MSIE';
            this.vendorPrefix = '-ms-';
        }
        else if (a.indexOf('Firefox') !== -1) {
            this.browser = 'Firefox';
            this.vendorPrefix = '-moz-';
        }
        else {
            this.browser = a;
        }
	}
};

module.exports = DeviceMixin;
