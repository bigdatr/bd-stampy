import React, { Component, PropTypes } from 'react';
import {fromJS} from 'immutable';
import classnames from 'classnames';

import componentClassNames from '../utils/ComponentClassNames';
import Paginate from '../utils/Paginate';
import Pagination from './Pagination';

class DataTable extends Component {

    constructor(props) {
        super(props);

        // initial state
        this.state = {
            sort: null,
            sortDirection: false
        };
    }
    
    getFilterValue(item, filter) {
        return (typeof filter === 'function') ? filter.call(this, item) : item[filter];
    }

    onSort(newSort) {
        const { sort, sortDirection } = this.state;
        var newDirection = true;
        // sort on a column that's already being sorted on
        if(sort == newSort) {
            // already sorting forward? reverse it
            if(sortDirection) {
                newDirection = false;
            } else {
                // already sorting backward? remove the sort
                newSort = null;
            }
        }

        this.setState({
            sort: newSort,
            sortDirection: newDirection
        });
    }

    getBodyData() {
        // 1. Filter search
        // 2. Sort direction
        // 3. Truncate to pagination

        const { search, data, schema } = this.props;
        const { sort, sortDirection } = this.state;

        var rows = fromJS(data);

        // filter search on keyword
        if(search.length) {
            const searchLowercase = search.toLowerCase();
            const filters = schema.map(ii => ii.filter);
            rows = rows.filter(row => {
                const rowJS = row.toJS();
                return filters
                    .map(filter => {
                        if(typeof filter == 'function') {
                            return filter(rowJS);
                        }
                        return row.get(filter, '');
                    })
                    .join('|')
                    .toLowerCase()
                    .indexOf(searchLowercase) !== -1;
            });
        }

        // sort results        
        if(sort) {
            var sortFunction = ii => ii[sort];
            if(typeof sort == 'function') {
                sortFunction = sort;
            }

            rows = rows.sortBy(ii => sortFunction(ii.toJS()));

            // reverse sort direction if applicable
            if(!sortDirection) {
                rows = rows.reverse();
            }
        }

        return rows.toJS();
    }

    getPaginateRows(data){
        if(this.props.pagination) {
            return Paginate(data, this.props.paginationLength, this.props.paginationPage);
        }
        return data;
    }

    render() {
        if(!this.props.data) {
            return null;
        }

        const data = this.getBodyData();
        return (
            <div>
                <table className={componentClassNames(this.props, 'Table')}>
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
    }

    renderTableHead() {
        return  this.props.schema.map((column, key) => {
            var sortAction = (column.filter) ? this.onSort.bind(this, column.filter) : null;
            
            var className = null;
            if(this.state.sort === column.filter) {
                className = classnames('Table-sort', this.state.sortDirection ? 'is-ascending' : 'is-descending');
            }

            return (
                <th
                    key={key}
                    className={className}
                    style={{width: column.width}}
                    onClick={sortAction}>
                    {column.heading || ''}
                </th>
            );
        });
    }

    renderTableBody(rowsCollection) {
        if(rowsCollection.length === 0) {
            return <tr><td colSpan={this.props.schema.length}>{this.props.empty}</td></tr>;
        }
        return rowsCollection.map((row, key) => {
            var columns = this.props.schema.map((schemaItem, columnKey) => {
                // if the user supplies a render function, call that with the current row's data
                var content = (schemaItem.render) ? schemaItem.render(row) : this.getFilterValue(row, schemaItem.filter);
                return <td key={columnKey}>{content}</td>;
            });
            return <tr key={key}>{columns}</tr>;
        });
    }

    renderPagination(length) {
        const {
            pagination,
            paginationPage,
            paginationLength,
            onPaginate,
            onPagingate
        } = this.props;

        if(pagination) {
            const handleClick = (a,b) => {
                onPaginate && onPaginate(a,b);
                onPagingate && onPagingate(a,b);
            };

            return (
                <Pagination 
                    length={length}
                    page={paginationPage} 
                    amount={paginationLength}
                    onClick={handleClick}
                />
            );
        }
    }
}

DataTable.defaultProps = {
    showIndexes: false,
    pagination: false,
    search: '',
    paginationLength: 10,
    paginationPage: 1,
    empty: <div className="Table_empty">No Results</div>
};

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    search: PropTypes.string,
    schema: PropTypes.arrayOf(PropTypes.shape({
        filter: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.func
        ]),
        heading: PropTypes.string,
        render: PropTypes.func,
        width: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })),
    pagination: PropTypes.bool,
    paginationLength: PropTypes.number,
    paginationPage: PropTypes.number,
    onPagingate: PropTypes.func, // legacy
    onPaginate: PropTypes.func, // corrected spelling
    empty: PropTypes.element,
    modifier: PropTypes.string
};

export default DataTable;
