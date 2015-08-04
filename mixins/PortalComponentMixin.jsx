console.warn('Warning PortalComponentMixin.jsx will be deprecated in the next minor version.');
/*global document*/
var React = require('react');

var PortalComponentMixin = {
    componentWillUnmount: function() {
        this._unrenderLayer();
        if(!this.props.portal){
            document.body.removeChild(this._target);
        }
    },
    componentDidUpdate: function() {
        this._renderLayer();
    },
    componentDidMount: function() {
        if(this.props.portal) {
            this._target = document.getElementById(this.props.portal);
        } else {
            this._target = document.createElement('div');
            document.body.appendChild(this._target);
        }
        this._renderLayer();
    },
    _renderLayer: function() {
        React.renderComponent(this.renderLayer(), this._target);
    },
    _unrenderLayer: function() {
        React.unmountComponentAtNode(this._target);
    },
     render: function() {
        return <span />;
    }
};

module.exports = PortalComponentMixin;
