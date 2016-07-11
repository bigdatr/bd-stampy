import React, { Component, PropTypes } from 'react';
import componentClassNames from '../utils/ComponentClassNames';

class Table extends Component {

    render() {
        if(this.props.type == "data") {
            console.warn('bd-stampy/Table with type="data" has been removed - use bd-stampy/DataTable instead');
            return null;
        }
        return (
            <table className={componentClassNames(this.props, 'Table')}>
                {this.renderSimpleHeadings()}
                <tbody>{this.props.children}</tbody>
            </table>
        );
    }

    renderSimpleHeadings() {
        var headings = this.props.headings;
        if(!headings) {
            return null;
        }
        if(typeof headings == "string") {
            headings = headings.split(",");
        }

        const ths = headings
            .map((ii, key) => <th key={key}>{ii}</th>);

        return <thead><tr>{ths}</tr></thead>;
    }
}

Table.propTypes = {
    type: PropTypes.string,
    headings: PropTypes.arrayOf(
        PropTypes.string
    )
};

export default Table;
