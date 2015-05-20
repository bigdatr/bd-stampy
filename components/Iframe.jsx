
var React = require('react');

var Iframe = React.createClass({
    displayName: 'Iframe',
    componentDidMount: function () {
        var iframe = this.refs.iframe.getDOMNode();
        if (iframe.attachEvent){
            iframe.attachEvent("onload", this.onLoad);
        } else {
          iframe.onload = this.onLoad;
        }
    },
    onLoad(e) {
        if(this.props.onLoad) {
            this.props.onLoad(e);
        }
    },
    render: function () {
        return (
            <iframe ref="iframe" {...this.props}></iframe>
        );
    }
});

module.exports = Iframe;