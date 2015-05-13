/** @jsx React.DOM */
var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');

var Textarea = React.createClass({
    displayName: 'Textarea',
    mixins: [ClassMixin],
    propTypes: {
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        ref: React.PropTypes.string,
        onChange: React.PropTypes.func
    },
    // shouldComponentUpdate: function(nextProps) {
    //     if (!nextProps.value || nextProps.value !== this.lastValue) {
    //         return true;
    //     }

    //     return false;
    // },
    getSelection: function(el) {
        var start, end;
        if (window.getSelection) {
            try {
                start = el.selectionStart;
                end = el.selectionEnd;

            } catch (e) {
                console.log('Cant get selection text');
            }
        }
        // For IE
        if (document.selection && document.selection.type !== "Control") {
            return document.selection.createRange().text;
        }

        return {
            start: start,
            end: end,
            length: end - start
        };
    },
    onChange:function(e){
        this.lastValue = this.refs.text.getDOMNode().value;
        if (this.props.onSelection) {
            this.onSelection();
        }
        if (this.props.onChange) {
            this.props.onChange(e, {
                key: this.props.name,
                value: this.lastValue
            });
        }
    },
    onSelection: function () {
        this.props.onSelection(this.getSelection(this.refs.text.getDOMNode()));
    },
    onKeyUp: function(e) {
        if (e.keyCode === 27) {
            // Stop Esc key from closing modal's
            e.stopPropagation();
            this.getDOMNode().blur();
        }

        this.onChange(e);
    },
    render: function() {
        var error;

        if (this.props.error) {
            error = <div className="Input_error">{this.props.error}</div>;
        }

        var classes = this.ClassMixin_getClass('Textarea')
            .add((this.props.isValid === false || this.props.error), 'is-error')
        ;

        return (
            <div>
                <textarea
                    {...this.props}
                    className={classes.className}
                    ref="text"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onMouseUp={this.onChange}
                    onChange={this.onChange}
                    onKeyUp={this.onKeyUp}
                    rows={this.props.rows}
                    >
                </textarea>
                {error}
            </div>
        );
    }
});

module.exports = Textarea;
