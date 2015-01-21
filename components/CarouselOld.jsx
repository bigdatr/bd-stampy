/** @jsx React.DOM */
var React = require('react');
var sImage = require('./Img.jsx');

var Carousel = React.createClass({
    displayName: 'Carousel',
    propTypes: {         
        // src: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            left: 0
        };
    },
    componentDidMount: function() {
        var container = this.refs.container.getDOMNode();
        var content = this.refs.content.getDOMNode();

        // Content Generator
        var size = 400;

        // Initialize Scroller
        var scroller = new Scroller(function(left, top, zoom) {
            this.setState({left: left});
        }.bind(this), {
            // scrollingY: false,
            paging: true,
            animating: false,
            bouncing: false
        });
        
        
        // Setup Scroller
        var rect = container.getBoundingClientRect();
        scroller.setPosition(rect.left+container.clientLeft, rect.top+container.clientTop);
        scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);


        if ('ontouchstart' in window) {
        
            container.addEventListener("touchstart", function(e) {
                // Don't react if initial down happens on a form element
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return;
                }
                
                scroller.doTouchStart(e.touches, e.timeStamp);
                e.preventDefault();
            }, false);

            document.addEventListener("touchmove", function(e) {
                scroller.doTouchMove(e.touches, e.timeStamp);
            }, false);

            document.addEventListener("touchend", function(e) {
                scroller.doTouchEnd(e.timeStamp);
            }, false);
        } else {
            
            var mousedown = false;

            container.addEventListener("mousedown", function(e) {
                // Don't react if initial down happens on a form element
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return;
                }
                
                scroller.doTouchStart([{
                    pageX: e.pageX,
                    pageY: e.pageY
                }], e.timeStamp);

                mousedown = true;
            }, false);

            document.addEventListener("mousemove", function(e) {
                if (!mousedown) {
                    return;
                }

                scroller.doTouchMove([{
                    pageX: e.pageX,
                    pageY: e.pageY
                }], e.timeStamp);

                mousedown = true;
            }, false);

            document.addEventListener("mouseup", function(e) {
                if (!mousedown) {
                    return;
                }

                scroller.doTouchEnd(e.timeStamp);

                mousedown = false;
            }, false);
            
        }
    },
    render: function() {
        var container = {
            width: 400,
            overflow: 'hidden'
        };

        var content = {
            width: this.props.images.length * 400,

            '-webkit-transform': 'translateX(-' + this.state.left + 'px)'
        };

        var cell = {
            width: 400,
            height: '100%',
            display: 'inline-block'
        };

        var cells = this.props.images.map(function(i) {
            return <li style={cell}><sImage src={i} width="400" /></li>
        });


        return (
            <div ref="container" style={container}>
                <ul ref="content" style={content}>
                    {cells}
                </ul>
            </div>
        );
    }
});

module.exports = Carousel;
