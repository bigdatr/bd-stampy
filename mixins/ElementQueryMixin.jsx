/*global window */
// var React = require('react');

// $bp-heavy:      1921px;         // >
// $bp-middle:     1920px;         // <
// $bp-welter:     1024px;         // <
// $bp-light:      768px;          // <
// $bp-feather:    480px;          // <

var breakpoint = {
    large:  1920,
    medium: 1024,
    small:  768,
    tiny:   480
};

function getBreakpointName(width) {
    var mediaClassName;

    if (width < breakpoint.tiny) {
        mediaClassName = 'tiny';
    }
    else if (width < breakpoint.small) {
        mediaClassName = 'small';
    }
    else if (width < breakpoint.medium) {
        mediaClassName = 'medium';
    }
    else if (width < breakpoint.large) {
        mediaClassName = 'large';
    }    
    else { // width > breakpoint.large
        mediaClassName = 'huge';
    } 

    return mediaClassName;
}

var ElementQueryMixin = {
    componentDidMount: function() {
        this.ElementQueryMixin_updateDimensions();
        window.addEventListener('resize', this.ElementQueryMixin_updateDimensions);
    },
    componentWillUnmount: function() {
        window.removeEventListener('resize', this.ElementQueryMixin_updateDimensions);
    },
    componentWillReceiveProps: function (nextProps) {
        // Make sure to recalculate on a change of visiblity
        if(this.props.visible !== nextProps.visible) {
            this.ElementQueryMixin_updateDimensions();
        }
    },
    ElementQueryMixin_updateDimensions: function() {
        var eqRef = this.refs.elementToQuery || this;
        var el = eqRef.getDOMNode();

        if (el) {
            this.setState({elementQuery: getBreakpointName(el.clientWidth)});
        }
    }
};

module.exports = ElementQueryMixin;