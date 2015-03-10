/** @jsx React.DOM */
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
        controls: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
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
            autoPlay: false
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
                        currentTime: timePercentage
                    });
                }
            }
        }
    },
    onScrub: function(e) {
        this.setState({dragging: true});
        if (this.state.fullscreen){
            this.updatePosition(e.clientX);
        } else {
            this.updatePosition(e.clientX - this.getDOMNode().offsetLeft);
        }
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
        var classes = this.ClassMixin_getClass('Video');
        classes.is(!this.state.paused, 'playing');
        classes.is(this.state.isDarkVideo, 'dark');

        return (
            <div className={classes.className} ref="wrapper" onKeyUp={this.onKeyUp} style={this.renderStyle()} tabIndex='0' >
                <video ref="video"
                    {...this.props}
                    onClick={this.onPlayPause}
                    src={this.props.src}
                    poster={this.props.poster}
                    autoPlay={this.props.autoPlay}
                    controls={false}
                    >
                    Sorry, your browser does not support embedded videos. <a href={this.props.src}>Download Instead</a>
                </video>
                {this.renderControls()}
            </div>
        );
    },
    renderControls: function() {
        if (!this.props.controls) {
            return null;
        }

        var playPauseIcon = this.state.paused ? this.props.playIcon : this.props.pauseIcon;
        var fullscreenIcon = this.state.fullscreen ? this.props.unfullscreenIcon : this.props.fullscreenIcon;
        var mutedIcon = this.state.muted ? this.props.mutedIcon : this.props.unmutedIcon;

        return (
            <div className="Video_controls">
                <div className="Video_toolbar">
                    <div className="l-right" onClick={this.onFullscreen}>{fullscreenIcon}</div>
                    <div className="l-right" onClick={this.onToggleSound}>{mutedIcon}</div>
                    <div onClick={this.onPlayPause}>{playPauseIcon}</div>
                </div>
                <div className="Video_progress" onMouseDown={this.onScrub} ref="progress">
                    <div className="Video_bar Video_bar-buffer" style={{width:this.state.buffered + "%"}}></div>
                    <div className="Video_bar Video_bar-progress" style={{width:this.state.currentTime + "%"}}></div>
                </div>
            </div>
        );
    },
    renderStyle: function () {
        // console.log(this.props.maxHeight);
        // return {
        //     height: this.props.maxHeight
        // }
    }

});

module.exports = Video;
