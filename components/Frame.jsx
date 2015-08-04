console.warn('Warning Frame.jsx will be deprecated in the next minor version.');

var React = require('react');

var opposites = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left'
};

var Frame = React.createClass({
    displayName: 'Frame',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    render: function () {
        var classes = this.ClassMixin_getClass('Frame');
        var styles = {
            width: this.props.width,
            height: this.props.height,
            marginLeft: this.props.offset
        };

        if (this.props.attach) {
            styles[this.props.attach] = 0;
            styles[opposites[this.props.attach]] = 'auto';
        }

        return (
            <div className={classes.className} style={styles}>{this.props.children}</div>
        );
    }
});

module.exports = Frame;
