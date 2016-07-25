import React, { Component, PropTypes } from 'react';
import componentClassNames from '../utils/ComponentClassNames';

class Table extends Component {

    render() {
        if(this.props.type == "data") {
            console.warn('bd-stampy/Table with type="data" has been removed - use bd-stampy/DataTable instead');
            return null;
        }

        // if <thead> or <tbody> is present as the first child, then just pass all children straight in
        if(this.props.children.length > 0 && (this.props.children[0].type == "thead" || this.props.children[0].type == "tbody")) {
            return (
                <table className={componentClassNames(this.props, 'Table')}>
                    {this.props.children}
                </table>
            );
        }

        // else, we're expecting <tr> elements as children, and an optional array of strings for a headings prop
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
