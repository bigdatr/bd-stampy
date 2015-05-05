var React = require('react');
var _ = require('lodash');

var Paginate = require('../utils/Paginate');
var Pagination = require('./Pagination');
var PureRenderComponent = require('./PureRenderComponent');
var ClassBuilder = require('../utils/ClassBuilder');

var DataTable = React.createClass({
    displayName: 'DataTable',
    mixins:[require('../mixins/ClassMixin')],
    propTypes: {
        data: React.PropTypes.array.isRequired,
        search: React.PropTypes.string,
        schema: React.PropTypes.arrayOf(React.PropTypes.shape({
            filter: React.PropTypes.string,
            heading: React.PropTypes.string,
            render: React.PropTypes.func,
            width: React.PropTypes.oneOfType([
                React.PropTypes.string,
                React.PropTypes.number
            ])
        })),
        pagination: React.PropTypes.bool,
        paginationLength: React.PropTypes.number,
        paginationPage: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            showIndexes: false,
            pagination: false,
            search: '',
            paginationLength: 10,
            paginationPage: 0
        };
    },
    getInitialState() {
        return {
            sort: null,
            sortDirection: false
        };
    },
    onSort(sortValue) {
        // only toggle direction if the user is clicking on the same heading
        var direction = (this.state.sort === sortValue) ? !this.state.sortDirection : true;
        this.setState({
            sort: sortValue,
            sortDirection: direction
        });
    },
    getBodyData() {
        // 1. Filter search.
        // 2. Sort Direction
        // 3. Truncate to pagination

        var props = _.pluck(this.props.schema, 'filter');

        var rows = _(this.props.data)
            .filter((data) => {
                var dataString;
                if(this.props.search.length) {
                    dataString = _(data).pick(props).values().join('').toLowerCase();
                    return dataString.indexOf(this.props.search.toLowerCase()) === -1;
                }
                return true;
            })
            .sortByOrder(this.state.sort, this.state.sortDirection)
        .value();



        return rows;
    },
    getPaginateRows(data){
        if(this.props.pagination) {
            return Paginate(data, this.props.paginationLength, this.props.paginationPage);
        }
        return data;
    },
    render() {
        if(!this.props.data) {
            return null;
        }

        var classes = this.ClassMixin_getClass('Table');
        var data = this.getBodyData();

        return (
            <div>
                <table className={classes.className}>
                    <thead>
                        <tr>
                            {this.renderTableHead()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableBody(this.getPaginateRows(data))}
                    </tbody>
                </table>
                {this.renderPagination(data.length)}
            </div>
        );
    },
    renderTableHead() {
        return  this.props.schema.map((column, key) => {
            var tableHeadingClass = new ClassBuilder();
            var sortAction = (column.filter) ? this.onSort.bind(null, column.filter) : null;

            if (this.state.sort === column.filter) {
                tableHeadingClass.add('Table-sort').add(this.state.sortDirection, 'is-ascending', 'is-descending');
            }

            return <th key={key} className={tableHeadingClass.className} style={{width: column.width}} onClick={sortAction}>{column.heading || ''}</th>;
        });
    },
    renderTableBody(rowsCollection) {
        return  rowsCollection.map((row, key) => {
            var columns = this.props.schema.map((schemaItem, key) => {
                // if the user supplies a render function, call that with the current row's data
                var content = (schemaItem.render) ? schemaItem.render(row) : row[schemaItem.filter];
                return <td key={key}>{content}</td>;
            });
            return <tr key={key}>{columns}</tr>;
        });
    },
    renderPagination(length) {
        if (this.props.pagination) {
            return <Pagination length={length} page={this.props.paginationPage} ammount={this.props.paginationLength} onClick={this.props.onPagingate}/>;
        }
    }
});

module.exports = DataTable;
