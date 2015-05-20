var React = require('react');

var Input = require('./InputElement');

var InputForm = React.createClass({
    displayName: 'InputForm',
    render: function () {
        var error;
        var value;
        if(this.props.errors && this.props.errors[this.props.name]) {
            error = <div className="Input_error">{this.props.errors[this.props.name]}</div>;
        }

        if(this.props.formData && this.props.formData[this.props.name]) {
            value = this.props.formData[this.props.name];
        }

        return (
            <div>
                <Input
                    {...this.props}
                    value={value}
                    className={(error) ? 'is-error' : ''}
                />
                {error}
            </div>
        );
    }
});

module.exports = InputForm;
