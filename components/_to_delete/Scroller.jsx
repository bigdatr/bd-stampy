/** @jsx React.DOM */
var React = require('react');
var CSS = require('../utils/CSS');

var Scroller = React.createClass({
    propTypes: {
        'max-segments': React.PropTypes.number,
        segment: React.PropTypes.number,
        threshold: React.PropTypes.number,
        touchScroll: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            'max-segments': 1,
            segment: 1,
            threshold: 3,
            touchScroll: false
        };
    },
    getInitialState: function() {
        return {
            touchLeft: null,
            touchStartX: null,
            touchStartY: null,
            segment: null
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.segment) {
            this.setState({segment: null});
        }
    },
    onTouchStart: function(e) {
        var touch = e.touches[0];
        this.setState({touchStartX: touch.pageX, touchStartY: touch.pageY});
    },
    onTouchMove: function(e) {
        this.setState({touchLeft: e.touches[0].pageX});
    },
    onTouchEnd: function() {
        var nextState = {touchLeft: null, touchStartX: null, touchStartY: null},
            dl = this.getDragLength();
        
        // Check if the drag has passed the threshold to snap to another segment
        if (Math.abs(dl) > (this.props.regionWidth / this.props.threshold)) {
            var currentSegment = this.state.segment || this.props.segment;
            nextState.segment = dl < 0 ? currentSegment + 1 : currentSegment - 1;
            
            if (nextState.segment <= 0) {
                // Cannot display before segment 1
                nextState.segment = 1;
            }
            else if (nextState.segment > this.props.children.length) {
                // Don't go past the last segment
                nextState.segment = this.props.children.length;
            }

            if (this.props.onSegmentChange) {
                this.props.onSegmentChange({x: nextState.segment});
            }
        }

        this.setState(nextState);
    },
    getDragLength: function() {
        return this.state.touchLeft ? this.state.touchLeft - this.state.touchStartX : 0;
    },
    getLeftPosition: function() {
        var currentSegment = this.state.segment || this.props.segment;

        var seg = currentSegment - this.props['max-segments'];
        seg = seg < 0 ? 0 : seg;

        var leftPosition = -1 * (seg * this.props.regionWidth);
        var nextPosition = leftPosition + this.getDragLength();
        
        if (nextPosition > 0) {
            nextPosition = this.addTension(nextPosition);
        }

        return nextPosition;
    },
    addTension: function(x) {
        // Apply extra gravity if the user drags beyond the bounds
        x = Math.abs(x*0.9);

        var y = (0.15 * x * Math.exp(0.000025 * (-x * 6))) * 0.95;

        return y;
    },
    render: function() {
        var Scroller_style = {
            width: '100%',
            height: '100%',
            overflow: 'visible'
        };

        var Scroller_container_style = {
            width: '100%',
            height: '100%',
            overflow: 'visible',
            position: 'relative',
            'max-height': '100%',
            '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'
        };

        var Scroller_x_style = {
            height: '100%',
            overflow: 'visible',
            display: 'inline-block',
            position: 'relative',
            'min-width': '100%',
            'min-height': '100%'
        };

        if (!this.state.touchLeft) {
            // Don't delay transitions when following touch events
            // Scroller_x_style.transition = 'all 350ms';
            Scroller_x_style.transitionTimingFunction = 'cubic-bezier(0.5, 1.2, 0.5, 1)';
        }


        Scroller_x_style.transform = ['translate3d(',
                                        this.getLeftPosition() + 'px,',
                                        '0px,',
                                        '0px)'].join('');
        
        var Scroller_x_el_props = {
            className: "Scroller_x hardware",
            style: new CSS(Scroller_x_style).prefix()
        };
        
        // Only add touch handlers if required
        if (this.props.touchScroll) {
                Scroller_x_el_props.onTouchStart = this.onTouchStart;
                Scroller_x_el_props.onTouchMove = this.onTouchMove;
                Scroller_x_el_props.onTouchEnd = this.onTouchEnd;
                Scroller_x_el_props.onTouchCancel = this.onTouchEnd;
        }        
        
        var Scroller_x_el = React.DOM.div(Scroller_x_el_props, this.props.children);

        return (
            <div className="Scroller" style={Scroller_style}>
                <div className="Scroller_container" style={Scroller_container_style}>
                    {Scroller_x_el}
                </div>
            </div>
        );
    }
});

module.exports = Scroller;

