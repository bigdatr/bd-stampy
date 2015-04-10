/** @jsx React.DOM */

var React = require('react'),
    _ = require('lodash');

var ClassMixin = require('../mixins/ClassMixin.jsx');
var Input = require('./Input.jsx');
var Loader = require('./Loader.jsx');
var Choice = require('./Choice.jsx');
var Key = require('../utils/Key.js');
var Maths = require('../utils/Maths.js');
var Transition = React.addons.CSSTransitionGroup;

var Typeahead = React.createClass({
    displayName: 'Typeahead',
    mixins: [ClassMixin],
    propTypes: {
        // value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        values: React.PropTypes.arrayOf(React.PropTypes.shape({
          key: React.PropTypes.string,
          value: React.PropTypes.string
        })),
        onChange: React.PropTypes.func,
        results: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.object
        ]),
        resultsView: React.PropTypes.element,
        fetching: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        required: React.PropTypes.bool,
        multiple: React.PropTypes.bool,
        valueKey: React.PropTypes.bool,
        clearable: React.PropTypes.bool,
        sort: React.PropTypes.arrayOf(React.PropTypes.string)
    },
    getDefaultProps: function() {
        return {
            results: null,
            value: '',
            fetching: false,
            disabled: false,
            isValid: true,
            required: false,
            multiple: false,
            valueKey: true,
            clearable: true,
            choices: [],
            values: []
        };
    },
    getInitialState: function() {
        return {
            keySelectionIndex: 0,
            choiceSelectionIndex: 0,
            forceHideResults: false,
            hasFocus: false
        };
    },
    componentWillReceiveProps: function() {
        this.setState({
            keySelectionIndex: 0,
            forceHideResults: false
        });
    },
    onChange: function(e, details) {
        if (this.props.onChange) {
            this.props.onChange(e, details);
        }
    },
    onFocus: function(e, details) {
        this.setState({hasFocus: true});

        if (this.props.onFocus) {
            this.props.onFocus(e, details);
        }
    },
    onClearAndFocus: function (e, details) {
        this.setState({values: []});
        this.onFocus(e, details);
    },
    onBlur: function (e, details) {
        this.setState({forceHideResults: true, hasFocus: false});

        this.onChange(e, {
            key: details.key,
            value: ''
        });

        if (this.props.onBlur) {
            console.warn('Stampy.Typeahead', 'Using `onBlur` might have some issues becuase we also fire the `onChange` event here!');
            this.props.onBlur(e, details);
        }
    },
    onClick: function(item, header, e) {
        var values = this.props.multiple ? this.props.values : [];

        if (header) {
            values.push({key: header, value: item});

            this.setState({values: values});
        }

        this.onChange(e, {
            key: this.props.name,
            value: header ? '' : item,
            values: values
        });
    },
    onKeyDown: function(e) {
        var hasResults = false,
            totalResults = 0,
            key = _.partial(Key.isPressed, e); // apply the event object

        if (this.props.results && this.props.results.length) {
            hasResults = this.props.results.length > 0;
            totalResults = this.props.results.length;
        }
        else if (this.props.results) {
            _.forIn(this.props.results, function(v) {
                if (v.length > 0) {
                    hasResults = true;
                    totalResults += v.length;
                }
            });
        }

        var keySelectionIndex = this.state.keySelectionIndex;
        var choiceSelectionIndex = this.state.choiceSelectionIndex;
        var cycleAmmount;
        var selectedChoice = this.props.values[choiceSelectionIndex];

        if (key('up') || key('down')) {

            if (key('up')) {
                cycleAmmount = -1;
            }
            else if (key('down')) {
                cycleAmmount = 1;
            }

            if (hasResults) {
                this.setState({
                    keySelectionIndex: Maths.cycle(totalResults, keySelectionIndex + cycleAmmount)
                });
            }
            this.setState({
                choiceSelectionIndex: Maths.cycle(this.props.values.length, choiceSelectionIndex + cycleAmmount)
            });
            e.preventDefault();
        }

        // Only delete if there are values and the user is not searching
        if (key('backspace') && this.props.values.length > 0 && !this.props.results) {
            this.onRemoveValue(selectedChoice);
        }

        if (this.props.results) {
            if (Key.isPressed(e,'enter')) {
                if (this.props.results.length) {
                    this.onClick(this.props.results[this.state.keySelectionIndex], this.props.name, e);
                }
                else {
                    var item = this.getSelectedResult();
                    var groupCount = 0;

                    _.forIn(this.props.results, function(v, k) {
                        if (groupCount === item.groupIndex) {
                            this.onClick(v[item.resultIndex], k, e);
                        }
                        groupCount++;
                    }, this);
                }
                this.setState({forceHideResults: true});
            }
            else if (Key.isPressed(e, 'esc')) {
                this.setState({forceHideResults: true});
            }
        }
    },
    onRemoveValue: function(value, e) {
        var values = this.props.values;

        values = values.filter(function(v) {
            return v.key !== value.key || v.value !== value.value;
        });

        this.onChange(e, {
            key: this.props.name,
            value: '',
            values: values
        });
    },
    highlightResultPartial: function(result) {
        var regex = new RegExp(this.props.value, 'gi');
        result = result.replace(regex, function(match) {
            return '<span class="is-match" style="font-weight: bold">' + match + '</span>';
        });
        return <span dangerouslySetInnerHTML={{__html: result}} />;
    },
    getResults: function() {
        if (this.props.results.length) {
            var results = {};
            results[this.props.name] = this.props.results;

            return results;
        }

        return this.props.results;
    },
    getSelectedResult: function() {
        var keySelectionIndex = this.state.keySelectionIndex,
            results = this.props.results,
            offset = 0,
            output = {groupIndex: 0, resultIndex: null};

        if (!results) {
            return output;
        }
        else if (keySelectionIndex < 0) {
            return output;
        }
        else if (results.length) {
            output.resultIndex = keySelectionIndex;
            return output;
        }

        _.forIn(results, function(v) {
            if (!output.resultIndex) {
                if (keySelectionIndex < (v.length + offset)) {
                    output.resultIndex = keySelectionIndex - offset;
                    return output;
                }
                else {
                    output.groupIndex++;
                }

                offset += v.length;
            }
        });

        return output;
    },
    sortValues: function(values) {
        return _.sortBy(values, function(v) {
            var index = 999;

            _.find(this.props.sort, function(s, i) {
                if (s === v.key) {
                    index = i;
                    return true;
                }
                return false;
            });

            return index;
        }.bind(this));
    },
    render: function() {
        var classes = this.ClassMixin_getClass()
            .add(this.props.isValid === false, 'is-error')
            .add('relative')
            .is(this.props.multiple, 'multiple')
        ;

        // value = this.isMounted() ? this.props.value : '';
        // TODO: Investigate if this is going to break the whole app :)
        var value = this.props.value;

        var text_input = null;
        var inputClass = 'is-value';
        if (this.props.multiple || this.props.values.length === 0) {
            inputClass = '';  
        }

        text_input = (
            <Input 
                name={this.props.name} 
                onChange={this.onChange} 
                onFocus={this.onFocus}
                onBlur={this.onBlur} 
                value={value} 
                autoComplete="off"
                modifier={this.props.inputModifier}
                className={inputClass}
                tabIndex={this.props.tabIndex}
                onKeyDown={this.onKeyDown} 
                onKeyUp={this.onKeyUp}
                placeholder={this.props.placeholder}
                focus={this.props.focus}
                disabled={this.props.disabled}
            />
        );


        // FIXME: Transition time's out and will not remove element from DOM
        return (
            <div className={classes.className}>
                {text_input}
                {this.renderResults()}
                <ul>{this.renderChoices()}</ul>
            </div>
        );


        // return (
        //     <div className={classes.className}>
        //         {text_input}
        //         {this.renderResults()}
        //         <Transition transitionName="ChoiceAnimation" component="ul">{this.renderChoices()}</Transition>
        //     </div>
        // );
    },
    renderChoices: function() {
        if (this.props.values.length === 0) {
            return null;
        }

        var _values = this.props.values;

        if (this.props.sort && _values.length > 1) {
            _values = this.sortValues(_values);
        }

        var values = _values.map(function(v, k) {
            var valueKey;
            var isSelected;

            if (this.props.valueKey) {
                valueKey = <span key={v.key + '--' + v.value} className="List-dropdown_alternate">{v.key}</span>;
            }

            if(this.state.hasFocus && this.state.choiceSelectionIndex === k) {
                isSelected = true;
            }

            return (
                <Choice 
                    key={v.key + '--' + v.value}
                    modifier={v.key}
                    selected={isSelected}
                    disabled={!this.props.clearable}
                    closeIcon={this.props.closeIcon}
                    onDelete={this.onRemoveValue.bind(this, v)}>
                    <span>{v.value} </span>
                    {valueKey}
                </Choice>
            );
        }.bind(this));

        return values;
    },
    renderResults: function() {
        if (!this.state.hasFocus) {
            return null;
        }
        else if (this.props.fetching) {
            return <ul className="List-dropdown"><li className="List-dropdown_item"><Loader modifier="static" /></li></ul>;
        }
        else if (this.state.forceHideResults) {
            return null;
        }
        else if (!this.props.results) {
            return null;
        }
        else if (this.props.results.length === 0 && this.props.required) {
            return <ul className="List-dropdown"><li className="List-dropdown_item">No Results</li></ul>;
            // return null;
        }
        else if (this.props.required === false && this.props.results.length === 1 && this.props.results[0] === this.props.value) {
            // Ignore results where the only one is what's been typed in
            return null;
        }
        else if (this.props.value.length === 0 && this.props.values.length > 0) {
            return null;
        }

        return this.renderResultGroups();
    },
    renderResultGroups: function() {
        var data = this.getResults();
        var showHeaders = this.props.results.length ? false : true;

        var results = [],
            groupCount = 0;       
        

        var selectedResult = this.getSelectedResult();

        _.forIn(data, function(v, k) {
            var selectedIndex = selectedResult.groupIndex === groupCount ? selectedResult.resultIndex : null;
            var r = this.renderResultsList(v, k, selectedIndex);

            if (showHeaders) {
                results.push(<div className={"List-dropdown_heading "+k} key={k}>{k}</div>);
                results.push(r);
            }
            else {
                results.push(r);
            }

            groupCount++;
        }, this);

        // No results
        if (results.length === 0) {
            results.push(<li key="noresults" className="List-dropdown_item">No results</li>);
        }

        return <ul className="List-dropdown">{results}</ul>;
    },
    renderResultsList: function(data, header, selectedIndex) {
        var resultsView = this.props.resultsView;

        var results = data.map(function(r, i) {
            // Allow custom results styling
            var display = resultsView ? resultsView({result: r}) : this.highlightResultPartial(r);
            var classes = 'List-dropdown_item '+header;

            if (selectedIndex === i) {
                classes += ' is-active';
            }

            return <li key={r} className={classes} onMouseDown={this.onClick.bind(this, r, header)}>{display}</li>;
        }.bind(this));

        return results;
    }
});

module.exports = Typeahead;