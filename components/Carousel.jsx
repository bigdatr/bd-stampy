
var React = require('react');

var Carousel = React.createClass({
    displayName: 'Carousel',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        images: React.PropTypes.array.isRequired,
        dots: React.PropTypes.bool,
        navigation: React.PropTypes.bool
    },
    getDefaultProps: function () {
        return {
            dots: true,
            navigation: true
        };
    },
    render: function () {
        var classes = this.createClassName('Carousel');
        return (
            <div className={classes.className}>
                {this.renderImages()}
                {this.renderDots()}
                {this.renderNavigation()}
            </div>
        );
    },
    renderImages: function() {
        return <div>Images</div>;
    },
    renderDots: function() {
        return <div>Dots</div>;
    },
    renderNavigation: function() {
        return <div>Nav</div>;
    },
});

module.exports = Carousel;
