/** @jsx React.DOM */
var React = require('react'),
    _ = require('lodash');

var FTScroller = require('../environment/FTScroller'),
    CubicBezier = require('../environment/CubicBezier');

var SCROLLER_OPTIONS = {
    // alwaysScroll: true,
    scrollingX: false,
    scrollingY: false,
    // snapping: true,
    // paginatedSnap: true,
    disabledInputMethods: {
        // mouse: true,
        scroll: true
    },
    scrollbars: false,
    updateOnWindowResize: true,
    // updateOnChanges: true,
    
    maxFlingDuration: null,
    flinging: false,

    windowScrollingActiveFlag: 'isScrollerActive',

    // Sliding
    flingBezier: new CubicBezier(0.5, 1.2, 0.5, 1), 

    bounceDecelerationBezier: new CubicBezier(0, 0, 1, 1),
    bounceBezier: new CubicBezier(0, 0, 1, 1)
};


var Scroller = React.createClass({
    propTypes: {
        options: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
            options: {}
        };
    },
    getInitialState: function() {
        return {
            top: 0,
            left: 0,
            animateScroll: false
        };
    },
    componentWillMount: function() {
        this.configured = false;
    },
    componentDidMount: function() {
        this.configure();
    },
    componentDidUpdate: function() {
        // this.configure();

        // After the DOM has been updated, scroll to the correct position
        var minDuration;

        if (this.state.animateScroll && navigator.userAgent.indexOf('Android') !== -1) {
            // Should only do this for Android devices cause it seems to be ok on iOS
            minDuration = 500;
        }
        
        console.log('::componentDidUpdate:left', this.state.left, this.scroller);
        this.scroller.scrollTo(this.state.left, this.state.top, this.state.animateScroll, minDuration);
    },
    componentWillReceiveProps: function(nextProps) {
        var left;

        if (nextProps.segment !== this.lastSegment) {
            left = this.getPx(nextProps.segment, nextProps.regionWidth);
            this.setState({left: left, animateScroll: true});
            this.lastSegment = nextProps.segment;
        }
        else if (nextProps.regionWidth !== this.props.regionWidth) {
            // Update scroller dimensions and then shift left position
            this.configure(nextProps, true);
            left = this.getPx(nextProps.segment, nextProps.regionWidth);
            this.setState({left: left, animateScroll: false});
        }
    },
    componentWillUnmount: function() {
        this.scroller.removeEventListener('segmentdidchange', this.onSegmentChange);
        this.scroller.destroy();
    },
    configure: function(nextProps, forceUpdateDimensions) {
        nextProps = nextProps || {};

        var node = this.getDOMNode(),
            regionWidth = nextProps.regionWidth || this.props.regionWidth,
            regionHeight = nextProps.regionHeight || this.props.regionHeight;

        if (!this.configured) {
            this.configured = true;

            this.options = _.defaults(this.props.options, SCROLLER_OPTIONS);

            this.scroller = new FTScroller(node, this.options);

            // Scroll to position
            if (this.props.segment) {
                this.lastSegment = this.props.segment;
                var left = this.getPx(this.props.segment, regionWidth);

                if (left > 0) {
                    this.scroller.scrollTo(left, 0, true);
                }
            }

            this.scroller.addEventListener('segmentdidchange', this.onSegmentChange);
            // this.scroller.addEventListener('scroll', this.debug);
        }

        // Don't check dimensions in DOM unless you absolutely have to #perfmatters
        if (!this.configured || forceUpdateDimensions) {
            var width = (regionWidth * this.props.children.length) || node.clientWidth,
                height = node.scrollHeight;
            
            console.log('::update dimensions', width);
            this.scroller.updateDimensions(width, height, true);
        }


        // Only supports snapping on X axis for now
        if (this.options.scrollingX) {
            this.scroller.setSnapSize(regionWidth, regionHeight);
        }
    },
    // debug: function(e) {
    //     console.log('::debug', e);
    // },
    onSegmentChange: function() {
        if (this.props.onSegmentChange && !isNaN(this.scroller.currentSegment.x)) {
            this.props.onSegmentChange({
                x: this.props['max-segments'] + this.scroller.currentSegment.x
            });
        }
    },
    getPx: function(segment, size) {
        var seg = segment - this.props['max-segments'];

        seg = seg < 0 ? 0 : seg;
        // seg = seg > this.props['max-segments'] ? this.props['max-segments'] : seg;

        return seg * size;
    },
    render: function() {
        // return (<div className="FTScroller">{this.props.children}</div>);

        return (
            <div className="FTScroller">
                <div className="ftscroller_container">
                    <div className="ftscroller_x ftscroller_hwaccelerated">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Scroller;

