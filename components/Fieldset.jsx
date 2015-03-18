var React = require('react');

var Fieldset = React.createClass({
    displayName: 'Fieldset',
    propsTypes: {
        legend: React.prop
    },
    render: function () {
        return (
            <fieldset>
                <legend>{this.props.legend}</legend>
                {this.props.children}
            </fieldset>
        );
    }
});

module.exports = Fieldset;
