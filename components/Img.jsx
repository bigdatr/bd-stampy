
/*global Image*/

var React = require('react');
var _ = require('lodash');

var Img = React.createClass({
    displayName: 'Img',
    mixins: [
        require('../mixins/ClassMixin.jsx')
    ],
    propTypes: {
        src: React.PropTypes.string.isRequired,
        block: React.PropTypes.bool,
        onLoad: React.PropTypes.func,
        onError: React.PropTypes.func,
        alt: React.PropTypes.string.isRequired,
        loader: React.PropTypes.element
    },
    getDefaultProps: function() {
        return {
            loader: null
        };
    },
    getInitialState: function() {
        return {
            cached: false,
            fallback: false,
            error: false
        };
    },
    shouldComponentUpdate: function(nextProps, nextState) {
        if (nextProps.src !== this.props.src) {
            return true;
        }

        if (nextState.cached !== this.state.cached) {
            return true;
        }

        if (nextState.fallback !== this.state.fallback) {
            return true;
        }

        return false;
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.src !== this.props.src) {
            this.setState(this.getInitialState());
        }
    },
    componentDidMount: function() {
        this.fetchImage();
    },
    componentDidUpdate: function () {
        this.fetchImage();
    },
    fetchImage: function() {
        var img = new Image();
        var _this = this;

        img.onload = function() {
            if (_this.isMounted()) {
                _this.setState({
                    cached: true,
                    fallback: false,
                    height: this.naturalHeight,
                    width: this.naturalWidth,
                });
            }

            if (_this.props.onLoad) {
                _this.props.onLoad(img);
            }
        };

        img.onerror = function() {
            this.setState({error: true, fallback: true, cached: false});

            if (_this.props.onError) {
                _this.props.onError(img);
            }
        }.bind(this);

        img.src = this.props.src;
    },
    render: function() {
        var src = '';
        var height;
        var width;

        var fallback = this.props.fallback || this.props.loader || 'notfound';

        var aspectRatio = this.props.maxHeight / this.props.maxWidth;
        var imageRatio = this.state.height / this.state.width;

        // if the image is more portrait than the screen
        // and is also taller
        // restrict the height to maxHeight
        if (imageRatio > aspectRatio) {
            if (this.state.height > this.props.maxHeight) {
                height = this.props.maxHeight;
            }
        }

        // Same for width
        if (imageRatio <= aspectRatio) {
            if (this.state.width > this.props.maxWidth) {
                width = this.props.maxWidth;
            }
        }

        if(this.props.height) {
            height = this.props.height;
        }

        if(this.props.height) {
            width = this.props.height;
        }


        // Is it cached or loading
        if (this.state.cached) {
            src = this.props.src;
        }
        else if (this.state.fallback || this.state.error) {
            src = fallback;
        }
        else {
            return this.props.loader;
        }

        return this.renderImage(src, height, width);
    },
    renderImage: function (src, height, width) {
        var errorClass = (this.state.error) ? 'is-error' : '';
        var classes = this.createClassName('Img')
            .add(this.props.block, 'block')
            .add(this.props.className)
            .add(errorClass);

        if(_.isString(src)) {
            return <img
                className={classes.className}
                src={src}
                height={height}
                width={width}
                alt={this.props.alt}
                title={this.props.title}
            />;
        }

        return React.cloneElement(src, {className: errorClass + ' ' + this.props.className});
    }
});

module.exports = Img;
