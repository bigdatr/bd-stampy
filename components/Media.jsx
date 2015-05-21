
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Media = React.createClass({
    displayName: 'Media',
    mixins: [ClassMixin],
    propTypes: {
        component:  React.PropTypes.func,
        align:      React.PropTypes.oneOf(['right']),
        onClick:    React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
            component: React.DOM.div
        };
    },
    render: function() {
        var classes = this.ClassMixin_getClass('Media')
            .modifier(this.props.align)
        ;

        return this.props.component({
                className: classes.className,
                onClick: this.props.onClick
            },
            <div className="Media_image">{this.props.image}</div>,
            <div className="Media_body">{this.props.children}</div>
        );
    }
});

module.exports = Media;
