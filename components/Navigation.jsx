/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Navigation = React.createClass({
    displayName: 'Navigation',
    mixins: [ClassMixin],
    propTypes: {
        left: React.PropTypes.node,
        // right: React.PropTypes.renderable,
        open: React.PropTypes.oneOf(['left','right', 'open', 'closed'])
    },
    onFocus: function (e, details) {
        if(this.props.onFocus) {
            this.props.onFocus(e, details);
        }
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Navigation')
            .modifier(this.props.open)
        ;

        var rightMenu = this.props.right ? <div onFocus={this.onFocus.bind(this, 'right')} className="Navigation_rightMenu" ref="rightMenu">{this.props.right}</div> : null;
        var leftMenu = this.props.left ? <div onFocus={this.onFocus.bind(this, 'left')} className="Navigation_leftMenu" ref="leftMenu">{this.props.left}</div> : null;

        return (
            <div className={classes.className}>
                {rightMenu}
                {leftMenu}
                <div className="Navigation_content">{this.props.children}</div>
            </div>
        );
    }
});

module.exports = Navigation;
