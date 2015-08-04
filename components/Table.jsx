
var React = require('react');
var _ = require('lodash');
var ClassMixin = require('../mixins/ClassMixin.jsx');
var ClassBuilder = require('../utils/ClassBuilder');
var Td = require('./Td');
var Tr = require('./Tr');


var Table = React.createClass({
    displayName: 'Table',
    mixins: [ClassMixin],
    propTypes: {
        type: React.PropTypes.string,
        data: React.PropTypes.object,
        headings: React.PropTypes.string,
        renderHeadings: React.PropTypes.bool

        // filter: React.PropTypes.array
    },
    getDefaultProps: function () {
        return {
            renderHeadings: true,
            empty: <div className="Table_empty">No Results</div>,
            search: '',
            filter: ''
        };
    },
    getInitialState: function () {
        return {
            sortBy: 'nothing',
            sortDescending: false
        };
    },
    shouldComponentUpdate: function (nextProps, nextState) {
        return true;
    },
    onSort: function (sortBy) {
        var direction = (sortBy === this.state.sortBy) ? !this.state.sortDescending : this.state.sortDescending;
        this.setState({
            sortBy: sortBy,
            sortDescending: direction
        });
    },
    render: function() {
        this.classes = this.ClassMixin_getClass('Table');
        switch (this.props.type) {
            case 'data':
                return this.renderDataTable();

            default:
                return this.renderSimpleTable();
        }
    },
    renderSimpleTable: function() {
        return (
        	<table className={this.classes.className}>
                <thead>{this.renderSimpleHeadings(this.props.headings)}</thead>
                <tbody>{this.props.children}</tbody>
            </table>
        );
    },
    renderSimpleHeadings: function (a) {
        if(this.props.headings) {
            return _.map(a.split(','), function(i, key){
                if(key[0] !== '_') {
                    var data_heading =  (this.props.headingData) ? this.props.headingData[key] : '';
                    return <th key={"t-" + i} data-heading={data_heading} onClick={this.props.onClick}>{i}</th>;
                }
            }, this);
        }
    },
    renderDataTable: function() {
        if(!this.props.children.length) {
            return this.props.empty;
        }

        var filter = this.props.filter.toLowerCase();
        var search = this.props.search.toLowerCase();

        var rows = _.chain(this.props.children)
            .sortBy(function(item){
                if (item) {
                    if (item[this.state.sortBy]) {
                        var sortBy = item[this.state.sortBy].sort || item[this.state.sortBy];
                        if(typeof sortBy === 'string') {
                            return sortBy.toLowerCase();
                        }
                        return sortBy;
                    }
                    return null;
                }
            }, this)
            .map(function(item){
                var _id = item._id;
                var nullCount = 0;
                var tds = _.map(item, function(item, key){

                    if(key[0] !== '_') {
                        if(this.props.search.length !== 0) {
                            var compareTerm = (item.filter || item.sort || item).toString().toLowerCase();
                            if(!(compareTerm.indexOf(filter) !== -1 && compareTerm.indexOf(search) !== -1)) {
                                nullCount++;
                            }
                        }
                        return <Td key={key + _id} data={item.value || item}></Td>;
                    }
                    nullCount++;
                }, this);
                if(nullCount === _.size(this.props.children[0])) {
                    return null;
                }
                return <Tr key={_id}>{tds}</Tr>;
            }, this)
        .value();

        if(_.compact(rows).length === 0) {
            return this.props.empty;
        }

        if(this.state.sortDescending) {
            rows = rows.reverse();
        }
        return (
            <table className={this.classes.className}>
                {this.renderThead()}
                <tbody>{rows}</tbody>
            </table>
        );
    },
    renderThead: function () {
        if(this.props.renderHeadings) {
            var headings = _.map(this.props.children[0], function(item, key) {

                if(key[0] !== '_') {
                    var name = key;
                    var tableClass = new ClassBuilder();
                    var width =  (item.width) ? item.width + '%' : undefined;

                    if (this.state.sortBy === name) {
                        tableClass.add('Table-sort')
                            .add(this.state.sortDescending, 'is-descending', 'is-ascending');
                    }

                    return <th key={key} className={tableClass.className} onClick={_.bind(this.onSort, this, name)} style={{width: width}}>{name}</th>;
                }
            }, this);
            return <thead>{headings}</thead>;
        }
    }
});

module.exports = Table;
