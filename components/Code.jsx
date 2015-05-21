

var React = require('react');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var _ = require('lodash');



var Input = React.createClass({
    displayName: 'Input',
    mixins: [ClassMixin],
    propTypes: {
        language: React.PropTypes.oneOf(['json']),
        colorScheme: React.PropTypes.oneOf(['dark', 'light'])
    },
    getDefaultProps: function() {
        return {
            colorScheme: 'light',
            language: 'json'
        };
    },

    render: function() {
        var classes = this.ClassMixin_getClass('Code')
            .modifier(this.props.language)
            .modifier(this.props.colorScheme);
        return (
            <samp className={classes.className}>{this.syntaxHighlight(this.props.children, this.props.language)}</samp>
        );
    },
    syntaxHighlight: function (str, language) {
        var table = {
            json: this.highlightJSON
        }

        return table[language](str);
    },
    highlightJSON: function (json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 4);
        }

        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return _.map(json.match(/(\s+)|("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)|([:,\{\}])/g), function(match) {
            var cls = 'char';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            } else if (/[0-9]/.test(match)){
                cls = 'number';
            }

            return <span className={cls}>{match}</span>
        });

    }
});

module.exports = Input;


// , function (match) {
//             var cls = 'number';
//             if (/^"/.test(match)) {
//                 if (/:$/.test(match)) {
//                     cls = 'key';
//                 } else {
//                     cls = 'string';
//                 }
//             } else if (/true|false/.test(match)) {
//                 cls = 'boolean';
//             } else if (/null/.test(match)) {
//                 cls = 'null';
//             } else {
//                 cls = 'char'
//             }
//             return "<span className={cls}>" + match + "</span>";
//             // return '<span className="' + cls + '">' + match + '</span>';
//         }
