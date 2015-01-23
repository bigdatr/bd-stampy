/** @jsx React.DOM */
/*global window*/

var React = require('react/addons'),
    _ = require('lodash');

var Scroller = require('./Scroller.jsx');

var LayoutManagerMixin = require('../mixins/LayoutManagerMixin.jsx');
var Transition = React.addons.CSSTransitionGroup;

var LayoutManager = React.createClass({
    displayName: 'LayoutManager',
    mixins: [LayoutManagerMixin],
    propTypes: {
        currentPosition: React.PropTypes.number,
        'maxRegions': React.PropTypes.number,
        isScrollable: React.PropTypes.bool,
        scrollable: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            hasToolbar: false,
            'maxRegions': 1,
            isScrollable: false,
            scrollable: false
        };
    },
    getInitialState: function() {
        return {
            currentPosition: this.props.currentPosition || this.props['maxRegions'],
            regionWidth: 0,
            clientWidth: 0,
            windowWidth: window.innerWidth
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.currentPosition) {
            this.setState({currentPosition: nextProps.currentPosition});
        }
    },
    componentDidMount: function() {
        this.updateDimensions();
        this.throttledResize = _.throttle(this.updateDimensions, 250);
        window.addEventListener('resize', this.throttledResize);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.throttledResize);
    },
    onWindowResize: function() {
        _.throttle(this.updateDimensions, 250);
        var throttled = _.throttle(this.updateDimensions, 5000);
        throttled();
    },
    updateDimensions: function() {
        var cw = this.getDOMNode().clientWidth;

        this.setState({
            clientWidth: cw,
            regionWidth: cw / this.props['maxRegions']
        });
    },
    handleResize: function() {
        this.setState({windowWidth: window.innerWidth});
    },
    updateRegionIndexes: function(pos) {
        var perc = 100 / this.props.maxRegions;
        var xPosition = this.props.scrollable ? 0 : -(pos - 1) * this.state.regionWidth;


        if (!React.Children.count(this.props.children)) {
            this.props.children.props.regionIndex = 1;
            this.props.children.props.left = 0;
            this.props.children.props.scrollable = this.props.scrollable;
            this.props.xPosition = xPosition;
            this.props.visible = true;
        } else {
            React.Children.forEach(this.props.children, function(c, i) {
                var regionPosition = i + 1;
                c.props.regionIndex = regionPosition;
                c.props.totalRegions = this.props.children.length;
                c.props.left = i * perc;

                // c.props.left = (100 - regionWidths[i]) + (100 * this.props.maxRegions) / this.props.maxRegions;
                c.props.scrollable = this.props.scrollable;

                
                
                if (regionPosition >= this.props.maxRegions && regionPosition >= this.state.currentPosition) {
                    c.props.hasExternalActions = true;
                }

                c.props.xPosition = xPosition;

                var minPositionToDisplay = pos - (this.props.maxRegions - 1),
                    maxPositionToDisplay = pos;

                // c.props.visible = regionPosition >= pos && regionPosition <= (pos + (this.props.maxRegions - 1)) ? true : false;
                c.props.visible = regionPosition >= minPositionToDisplay && regionPosition <= maxPositionToDisplay;
            }.bind(this));
        }

    },
    onSegmentChange: function(data) {
        console.log('segments Changes');
        if (data.x !== this.state.currentPosition) {
            this.setState({currentPosition: data.x});
        }
    },
    render: function() {
        var classes = 'LayoutManager';
        classes += ' maxRegions-' + this.props.maxRegions;

        var pos = this.state.currentPosition >= this.props.maxRegions ? this.state.currentPosition : this.props.maxRegions;

        this.updateRegionIndexes(pos);

        var options = {
            scrollingY: false,
            scrollingX: true,
            scrollBoundary: 20,
            scrollResponseBoundary: 10,
            snapping: true,
            updateOnWindowResize: true,
            paginatedSnap: true,
            snapSizeX: this.state.regionWidth
        };

        var scroller;

        if (this.props.isScrollable) {
            console.warn('::LayoutManager', 'Use property "scrollable" instead of "isScrollable"');
        }

        if (this.props.scrollable || this.props.isScrollable) {
            scroller = (
                <Scroller 
                options={options}
                onSegmentChange={this.onSegmentChange}
                regionWidth={this.state.regionWidth}
                max-segments={this.props.maxRegions}
                segment={pos}
                touchScroll={false}
                >
                    {this.props.children}
                </Scroller>
            );
        }

        return <div className={classes}>{this.props.scrollable ? scroller : this.props.children}</div>;

        return (
            <Transition transitionName="pageFade" className={classes}>
                {this.props.scrollable ? scroller : this.props.children}
            </Transition>
        );
    }
});

module.exports = LayoutManager;
