/*global document*/

var Fullscreen = {
    enabled: function () {
        return (
            document.fullscreenEnabled || 
            document.webkitFullscreenEnabled || 
            document.mozFullScreenEnabled ||
            document.msFullscreenEnabled
        );        
    },
    active: function () {
        return (
            document.fullscreenElement ||
            document.webkitFullscreenElement ||
            document.mozFullScreenElement ||
            document.msFullscreenElement
        );
    },
    exit: function () {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    },
    request: function (element) {
        if (element.requestFullscreen) {
            this.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
};

module.exports = Fullscreen;