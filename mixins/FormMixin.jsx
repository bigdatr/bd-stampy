
var _ = require('lodash');

var FormMixin = {
	getInitialState: function() {
        var formData = _.cloneDeep(this.props.formData || {});
        var formErrors = this.props.formData ? this.FormMixin_validateAll(formData) : {};

        var nextState = {
            formData: formData,
            formErrors: formErrors
        };

        if (this.FormMixin_initialFormData) {
            formData = this.FormMixin_initialFormData(nextState) || nextState;
        }

        return nextState;
    },
    FormMixin_onFormChange: function(e, details, callback) {
        var formData = this.state.formData,
            formErrors = this.state.formErrors || {};

        formData[details.key] = details.value;

        // Validate field
        if (this.validators) {
            formErrors[details.key] = this.FormMixin_validate(details.key, details.value);
        }

        this.setState({formData: formData, formErrors: formErrors}, callback);
    },
    FormMixin_validateAll: function(formData) {
        var formErrors = {};

        formData = formData || this.state.formData;

        if (this.validators) {
            for (var key in this.validators) {
                if (this.validators[key]) {
                    formErrors[key] =  this.FormMixin_validate(key, formData[key]);
                }
            }
        }

        this.setState({formErrors: formErrors});

        return formErrors;
    },
    FormMixin_validate: function(key, value) {
        if (this.validators && key && this.validators[key]) {
            return this.validators[key](value, this);
        }

        return null;
    },
    FormMixin_isValid: function() {
        if (this.validators) {
            var formErrors = this.FormMixin_validateAll();

            for (var key in formErrors) {
                // If any field is not valid, return false
                if (formErrors[key] !== undefined && formErrors[key] !== null && formErrors[key] !== true) { return false; }
            }
        }

        return true;
    },
    FormMixin_getData: function() {
        var data = _.clone(this.state.formData);

        if (this.transformData) {
            for (var key in this.transformData) {
                if (this.transformData.hasOwnProperty(key)) {
                    data[key] = this.transformData[key] ? this.transformData[key](data[key], this, key) : data[key];
                }
            }
        }

        return data;
    },
    FormMixin_updateState: function (formData) {
        this.setState({formData: formData, formErrors: {}});
        this.FormMixin_validateAll(formData);
    }
};

module.exports = FormMixin;
