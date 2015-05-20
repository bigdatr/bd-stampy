

var React = require('react');

var StickyFooter = React.createClass({
    displayName: 'StickyFooter',
    render: function() {
        return (
            <div className={this.props.className} style={{height: '100%'}}>
                <div className="StickyFooter" style={{marginBottom: -(this.props.height)}}>
                    {this.props.children}
                    <div style={{height:this.props.height}}></div>
                </div>
                <div style={{height: this.props.height}}>{this.props.stuck}</div>
            </div>            
        );
    }
});

module.exports = StickyFooter;