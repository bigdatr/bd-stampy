var React = require('react/addons');

var Animation = React.createClass({
    displayName: 'Animation',
    componentDidMount: function () {
        var el = this.refs.animation.getDOMNode();

        var first = el.getBoundingClientRect();

        // Now set the element to the last position.
        el.classList.add(this.props.name + '-end');

        // Read again. This forces a sync layout, so be careful.
        var last = el.getBoundingClientRect();

        // You can do this for other computed styles as well, if needed.
        // Just be sure to stick to compositor-only props like transform
        // and opacity where possible.
        // 
        var invertY = first.top - last.top;
        var invertX = first.left - last.left;


        // Invert.
        el.style.transform = 'translateY(' + invertY + 'px)';
        el.style.transform = 'translatex(' + invertX + 'px)';

        // Wait for the next frame so we know all the style changes have taken hold.
        requestAnimationFrame(() => {

            // Switch on animations.
            el.classList.add(this.props.name + '-transform');

            // GO GO GOOOOOO!
            el.style.transform = '';
        });

        // Capture the end with transitionend
        // el.addEventListener('transitionend', tidyUpAnimations);  
    },
    render: function () {
        var clonedComponent = React.addons.cloneWithProps(this.props.children, { 
            ref: 'animation',
            className: this.props.name
        });
        return clonedComponent
    }
});

module.exports = Animation;