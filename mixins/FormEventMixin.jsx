var FormEventMixin = {
    onChange: function(e) {
        if (this.props.onChange) {
            this.props.onChange(e, this.getDetails());
        }
    },
    onFocus: function(e) {
        if (this.props.onFocus) {
            this.props.onFocus(e, this.getDetails());
        }
    },
    onBlur: function(e) {
        if (this.props.onBlur) {
            this.props.onBlur(e, this.getDetails());
        }
    },
    onKeyUp: function(e) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(e, this.getDetails());
        }
    }
};

module.exports = FormEventMixin;