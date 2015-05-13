/** @jsx React.DOM */
/**
 * Region
 *
 * @param {String} example  <p>See LayoutManager for demo</p>
 */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Region = React.createClass({
    displayName: 'Region',
    mixins: [ClassMixin],
    propTypes: {
        regionIndex: React.PropTypes.number,
        xPosition: React.PropTypes.number,
        visible: React.PropTypes.bool,
        width: React.PropTypes.number,
        scrollable: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            xPosition: 0,
            visible: false,
            left: 0
        };
    },
    getInitialState: function() {
        return {
            width: null,
            height: null
        };
    },
    componentDidMount: function() {
        this.updateDimensions();
    },
    updateDimensions: function() {
        if (this.props.isScrollable) {
            var el = this.getDOMNode();
            this.setState({
                width: el.clientWidth,
                left: el.clientWidth * (this.props.regionIndex - 1)
            });
        }
    },
    render: function() {
		var classes = this.ClassMixin_getClass('Region')
            .add(this.props.toolbar, 'is-toolbar')
            .is(this.props.hasExternalActions, 'externalActions')
        ;


        var style = {
            'margin-left': this.props.left + '%',
            'width': this.props.width + '%',
            '-webkit-transform': 'translate3d(' + this.props.xPosition + 'px, 0, 0)'
        };

        // if (this.state.width) {
            // style.width = this.state.width;
            // style['margin-left'] = this.state.left + 'px';
        // }

        return (
            <div className={classes.className} style={style}>
                {this.props.visible ? this.props.children : null}
            </div>
        );
    }
});

module.exports = Region;
