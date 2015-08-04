console.warn('Warning Video.jsx will be deprecated in the next minor version.');
/*global document*/

var React = require('react');

var ClassMixin = require('../mixins/ClassMixin.jsx');
var Maths = require('../utils/Maths.js');
var Icon = require('./Icon.jsx');
var Fullscreen = require('../utils/Fullscreen.js');

function percentage (a, b) {
    return 100 * a / b;
}

function unPercentage (a, b) {
    return b * a / 100;
}

var Video = React.createClass({
    displayName: 'Video',
    mixins: [ClassMixin],
    propTypes: {
        src: React.PropTypes.string,
        autoPlay: React.PropTypes.bool,
        poster: React.PropTypes.string,
        controls: React.PropTypes.bool,
        minVideoHeight: React.PropTypes.number,
        maxHeight: React.PropTypes.number,
        playIcon: React.PropTypes.element,
        pauseIcon: React.PropTypes.element,
        unfullscreenIcon: React.PropTypes.element,
        fullscreenIcon:React.PropTypes.element,
        mutedIcon: React.PropTypes.element,
        unmutedIcon: React.PropTypes.element
    },
    getDefaultProps: function() {
        return {
            minVideoHeight: 480,
            controls: true,
            playIcon:           <Icon modifier="button" name="play"></Icon>,
            pauseIcon:          <Icon modifier="button" name="pause"></Icon>,
            unfullscreenIcon:   <Icon modifier="button" name="unfullscreen"></Icon>,
            fullscreenIcon:     <Icon modifier="button" name="fullscreen"></Icon>,
            mutedIcon:          <Icon modifier="button" name="muted"></Icon>,
            unmutedIcon:        <Icon modifier="button" name="unmuted"></Icon>
        };
    },
    getInitialState: function() {
        return {
            paused: true,
            fullscreen: false,
            muted: false,
            duration: 0,
            buffered: 0,
            currentTime: 0,
            dragging: false,
            autoPlay: false,
            currentSec: 0
        };
    },
    componentDidMount: function() {
        // Add Listeners
        this.timeouts = [];
        this._video = this.refs.video.getDOMNode();
        this._video.addEventListener('loadedmetadata', this.onVideoLoaded);
        this._video.addEventListener('seeking', this.onVideoSeek);
        this._video.addEventListener('seeked', this.onVideoSought);
        this.refs.wrapper.getDOMNode().focus();
    },

    componentWillUnmount: function() {
        // Cleanup listeners
        clearInterval(this.bufferInterval);
        this._video.removeEventListener('loadedmetadata', this.onVideoLoaded);
        this._video.removeEventListener('seeking', this.onVideoSeek);
        this._video.removeEventListener('seeked', this.onVideoSought);
    },
    onVideoLoaded: function () {
        // update buffer
        this.bufferInterval = setInterval(this.buffer, 150);
    },
    buffer: function () {
        var v = this._video;

        if(v.buffered.length > 0) {
            var currentBuffer = v.buffered.end(0);
            // var lastBuffer = v.buffered.end(v.buffered.length - 1);
            var perc = Maths.toPercentage(currentBuffer, v.duration);
            var timePercentage = Maths.toPercentage(v.currentTime, v.duration);

            if(!this.state.dragging){
                if(this.isMounted()){
                    this.setState({
                        buffered: perc,
                        duration: v.duration,
                        currentTime: timePercentage,
                        currentSec: v.currentTime
                    });
                }
            }
        }
    },
    onScrub: function(e) {
        this.setState({dragging: true});
        var rect = this._video.getBoundingClientRect();
        this.updatePosition(e.clientX -  rect.left);
        document.addEventListener('mousemove', this.onScrubDrag, false);
        document.addEventListener('mouseup', this.onScrubEnd, false);
    },
    onScrubDrag: function (e) {
            var rect = this._video.getBoundingClientRect(),
            x = e.clientX - rect.left,
            width = this._video.offsetWidth;

        // Stay within video bounds
        if(x >= 0 && x <= width) {
           this.updatePosition(x);
        }
        // Over
        else if (x >= width) {
            this.updatePosition(width);
        }
        // Under
        else {
            this.updatePosition(0);
        }
    },
    onScrubEnd: function () {
        this.setState({dragging: false});
        this.onPlay();
        document.removeEventListener('mousemove', this.onScrubDrag);
        document.removeEventListener('mouseup', this.onScrubEnd);
    },
    onVideoSeek: function () {
        this.setState({loading: true});
    },
    onVideoSought: function () {
        this.setState({loading: false});
    },
    updatePosition: function (xPos) {
        var perc = percentage(xPos, this._video.offsetWidth);
        this.setState({currentTime: perc});
        this._video.currentTime = unPercentage(perc, this.state.duration);
    },
    onKeyUp: function(e) {
         if (e.keyCode == 27) { // esc button.
            if (this.state.fullscreen) {
                e.stopPropagation();
                Fullscreen.exit();
                this.setState({fullscreen: false});
            } else {
                this.setState({fullscreen: true});
            }
         }
    },
    onPlay: function () {
        this._video.play();
        this.setState({paused: false});
    },
    onPause: function () {
        this._video.pause();
        this.setState({paused: true});
    },
    onPlayPause: function () {
        this.state.paused ? this.onPlay() : this.onPause();
    },
    onFullscreen: function () {
        var wrapper = this.refs.wrapper.getDOMNode();
        if (Fullscreen.enabled) {
            if (Fullscreen.active()) {
                Fullscreen.exit();
                this.setState({fullscreen: false});
            } else {
                Fullscreen.request(wrapper);
                this.setState({fullscreen: true});
            }
        }
    },
    onToggleSound: function () {
        this._video.muted = !this._video.muted;
        this.setState({muted: this._video.muted});
    },
    render: function() {
        var style = {
            width: '100%'
        };

        var videoStyle = {};

        if (this._video) {  // setup video height.
            var videoHeight = this._video.videoHeight;
            var videoWidth = this._video.videoWidth;
            var wrapperHeight = this.refs.wrapper.getDOMNode().offsetHeight;

            if(videoHeight > videoWidth) {
                style = {};
                if(videoHeight > wrapperHeight) {
                    videoStyle = {
                        height: wrapperHeight
                    };
                }
            }
        }

        var classes = this.ClassMixin_getClass('Video');
        classes.is(!this.state.paused, 'playing');
        classes.is(this.state.fullscreen, 'fullscreen');
        classes.is(this.state.isDarkVideo, 'dark');

        return (
            <div className={classes.className} ref="wrapper" onKeyUp={this.onKeyUp} tabIndex='0' style={style}>
                <video ref="video"
                    {...this.props}
                    onClick={this.onPlayPause}
                    src={this.props.src}
                    poster={this.props.poster}
                    autoPlay={this.props.autoPlay}
                    controls={false}
                    style={videoStyle}
                    >
                    Sorry, your browser does not support embedded videos. <a href={this.props.src}>Download Instead</a>
                </video>
                {this.renderControls()}
            </div>
        );
    },
    convertSecondsToHourMinuteSecond: function(seconds) {
        seconds = parseInt(seconds) || 0;
        var min = Math.floor(seconds / 60);
        var sec = seconds - (min * 60);
        var hr = Math.floor(seconds / 3600);

        var _timer = [];

        if (sec < 10) { // display 0:09 rather than 0:9
            sec = '0'.concat(sec);
        }

        if (hr === 0) {
            _timer = [min, sec];
        } else {
            if (min < 10) { // display 1:02:10 rather than 1:2:10
                min = '0'.concat(min);
            }
            _timer = [hr, min, sec];
        }

        return _timer.join(':');
    },
    renderControls: function() {
        if (!this.props.controls) {
            return null;
        }

        var playPauseIcon = this.state.paused ? this.props.playIcon : this.props.pauseIcon;
        var fullscreenIcon = this.state.fullscreen ? this.props.unfullscreenIcon : this.props.fullscreenIcon;
        var mutedIcon = this.state.muted ? this.props.mutedIcon : this.props.unmutedIcon;
        var videoDuration = this.convertSecondsToHourMinuteSecond(this.state.currentSec) + ' / ' + this.convertSecondsToHourMinuteSecond(this.state.duration);

        return (
            <div className="Video_controls">
                <div className="Video_toolbar">
                    <div className="Video_toolbarItem right" onClick={this.onFullscreen}>{fullscreenIcon}</div>
                    <div className="Video_toolbarItem right" onClick={this.onToggleSound}>{mutedIcon}</div>
                    <span  className="Video_toolbarItem "onClick={this.onPlayPause}>{playPauseIcon}</span>
                    <span className="Video_toolbarItem ">{videoDuration}</span>
                </div>
                <div className="Video_progress" onMouseDown={this.onScrub} ref="progress">
                    <div className="Video_bar Video_bar-buffer" style={{width:this.state.buffered + "%"}}></div>
                    <div className="Video_bar Video_bar-progress" style={{width:this.state.currentTime + "%"}}></div>
                </div>
            </div>
        );
    }

});

module.exports = Video;
