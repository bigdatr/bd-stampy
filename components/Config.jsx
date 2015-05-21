
/* global document, window */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var _ = require('lodash');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;

function validateLengthOf2(props, propName, componentName) {
    if(props[propName].length !== 2) {
        return new Error(componentName + ' requires 2 children');
    }
}


var Config = React.createClass({
    displayName: 'Config',
    mixins: [ClassMixin, PureRenderMixin],
    propTypes: {
        toggleButton: React.PropTypes.object,
        width: validateLengthOf2,
        children: validateLengthOf2
    },
    getInitialState: function() {
        return {
            active: false,
            sidebarTop: 0
        };
    },
    componentDidMount: function() {
        this.data = {
            bodyScrollHeight: document.body.scrollHeight,
            bodyClientHeight: document.body.clientHeight
        };

        // window.addEventListener('scroll', this.onScroll, false);
    },
    componentWillUnmount: function() {
        window.removeEventListener('scroll', this.onScroll, false);
    },
    onClick: function() {
        this.setState({active: !this.state.active});
    },
    onScroll: function (ev) {
        // var scrollTop = ev.target.body.scrollTop;

        // // Make sure inertia scrolling does not start adding to the calculation of the sidebarTop
        // // this creates an infinte loop of adding and then exceeding and the adding
        // // making the sidebarTop forever increase.

        // if(!(ev.target.body.scrollHeight - scrollTop < this.data.bodyClientHeight || scrollTop < 0)) {
        //     this.setState({sidebarTop: scrollTop});
        // }
    },
    onSidebarScroll: function (ev) {
        // var target = ev.currentTarget;
        // var dy = ev.deltaY;
        // var isBottom = (target.scrollHeight - target.scrollTop === target.offsetHeight);
        // var isTop = (target.scrollTop === 0);

        // if((isBottom && dy > 0) || (isTop && dy < 0)) {
        //     ev.preventDefault();
        // }

        // ev.stopPropagation();
    },
    render: function() {
        // var height = document.getElementById('AppView').offsetHeight - 48;
        var active = this.props.active || this.state.active;
        var classes = this.ClassMixin_getClass('Config')
            .is(active, 'active');

        if(this.props.right) {
            classes.modifier('right');
        }
        
        var sidebarStyles = _.merge(this.renderChildProps(1), {
            marginTop: this.state.sidebarTop,
            // height: height
        });

        return (
            <div className={classes.className}>
                {this.renderToggleButton(this.props.toggleButton)}
                <div className="Config_slider">
                    <div className="Config_region Config_sidebar" ref="sidebar" onWheel={this.onSidebarScroll} style={sidebarStyles}>{this.props.children[1]}</div>
                    <div className="Config_region" style={this.renderChildProps(0)}>{this.props.children[0]}</div>
                </div>
            </div>
        );
    },
    renderToggleButton: function (button) {
        if (this.props.toggleButton) {
            return React.addons.cloneWithProps(button, {
                onClick: this.onClick,
                className: 'Config_toggleButton'
            });
        }
    },
    renderChildProps: function(num) {

        // Fixed widths
        if (this.props.width[num].toString().indexOf('px')) {
            if(num === 0) {
                return {
                    width: 'calc(100% - ' + this.props.width[1] + ')'
                };
            } else {
                return {
                    width: this.props.width[num],
                    // marginLeft: 'calc(100% - ' + this.props.width[num] + ')'
                };
            }
            
        }
        //Percentage Widths 
        else {
            return {
                width: this.props.width[num],
                marginLeft: this.props.width[num - 1] || 0
            };
        }       
        
    }
});

module.exports = Config;


