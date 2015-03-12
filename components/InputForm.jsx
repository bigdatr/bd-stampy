var React = require('react');

var Input = require('./InputElement');

var InputForm = React.createClass({
    displayName: 'InputForm',
    render: function () {
        var error;

        if(this.props.errors && this.props.errors[this.props.name]) {
            error = <span className="Input_error">{this.props.errors[this.props.name]}</span>;
        }

        return (
            <div>
                <Input {...this.props} value={this.props.formData[this.props.name]}className={(error) ? 'is-error' : ''} />
                {error}
            </div>
        );
    }
});

module.exports = InputForm;
