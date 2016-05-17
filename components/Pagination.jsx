
import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
// ^ as we move to es6 and mixins are no longer supported, use the classnames package instead of the class mixin

/**
 * Pagination
 *
 * Component to display pagination numbers an provide pagination controls
 * 
 * Example usage:
 *
 * <Pagination
 *   length={this.props.items.length}
 *   page={this.props.currentPage}
 *   amount={this.props.resultsPerPage}
 *   onClick={this.onPaginate.bind(this)}/>
 *
 * This component provides the pagination selector buttons, it does not display the actual list of items
 * You'll want to use bd-stampy/utils/Paginate.js function to filter down your array of items, using some of the same variables
 * that you'll pass as props into this Pagination component (such as items, number of items, items per page...)
 *
 * Props:
 * @param {number} [length=0] - the number of items in your total list
 * @param {number} [page=1] - an integer greater than 0 representing the current page of results to display
 * @param {number} [amount=25] - the amount of items to view per page
 * @param {function} [onClick] - a callback that fires when a new page is selected from this component
 * @param {number} [maxLinks=8] - the maximum number of page number links to display (e.g. buttons that go "1 2 3 4 5" to skip to a page)
 * @param {string} [nextButton] - set the text in the 'next' button
 * @param {string} [previousButton] - set the text in the 'previous' button
 * @param {boolean} [ellipsis=false] - whether to show ellipsis (...) next to page selection number links or not
 *
 *
 */

class Pagination extends Component {
    constructor(props) {
        super(props);

        // manually binding methods to self until ES7...
        this.numberOfPages = this.numberOfPages.bind(this);
        this.currentPage = this.currentPage.bind(this);
        this.renderButtons = this.renderButtons.bind(this);
        this.renderPageList = this.renderPageList.bind(this);
        this.renderPageListItem = this.renderPageListItem.bind(this);
        this.renderPageListEllipsis = this.renderPageListEllipsis.bind(this);
    }

    onClick(page, e) {
        if(this.props.onClick) {
            this.props.onClick(e, page);
        }
    }

    render() {
        var numberOfPages = this.numberOfPages();

        var classes = classnames(
            "Pagination",
            this.props.className,
            this.props.modifier ? this.props.modifier.split(' ').map(ii => `Pagination-${ii}`) : false
        );

        if(numberOfPages === 1) {
            return null;
        }

        var buttons = this.renderButtons();
        var list = this.renderPageList();

        return (
            <div className={classes}>
                {buttons}
                <ul className="Pagination_list">
                    {list}
                </ul>
            </div>
        );
    }

    numberOfPages() {
        return Math.ceil(this.props.length / this.props.amount);
    }

    currentPage() {
        // if the user supplies a page that is too small (less than one), select the first page
        // if the user supplies a page that is too large, select the last page
        return Math.max(1,Math.min(this.props.page, this.numberOfPages()));
    }

    renderPageList() {
        var currentPage = this.currentPage();
        var numberOfPages = this.numberOfPages();

        // calculate min page number based off maximum number of page number to show and current page
        var minPageNumber = Math.ceil(currentPage - this.props.maxLinks / 2 );
        // ensure that the number isn't too high and allows the total required number of page numbers to show
        minPageNumber = Math.min( minPageNumber, numberOfPages - this.props.maxLinks + 1 );
        // ensure 1 is the lowest starting number possible
        minPageNumber = Math.max( minPageNumber, 1 );
        // calculate max page number based off min page number, using Math.min to protect against array overflow
        var maxPageNumber = Math.min(minPageNumber + this.props.maxLinks - 1, numberOfPages);

        // array of page list items to render
        var items = [];

        // render start ellipsis if required
        if(this.props.ellipsis && minPageNumber > 1) {
            items.push(this.renderPageListEllipsis("...1")); // unique key for ellipsis
        }

        // render page list items
        for(var pageNumber = minPageNumber; pageNumber <= maxPageNumber; pageNumber++) {
            items.push(this.renderPageListItem(pageNumber));
        }

        // render end ellipsis if required
        if(this.props.ellipsis && maxPageNumber < numberOfPages) {
            items.push(this.renderPageListEllipsis("...2")); // unique key for ellipsis
        }
        return items;
    }

    renderPageListEllipsis(key) {
        return <li key={key} className="Pagination_listItem Pagination_listItem-ellipsis">...</li>;
    }

    renderPageListItem(pageNumber) {
        var isActive = pageNumber === this.currentPage() ? 'Pagination_listItem-isActive' : '';
        return <li key={pageNumber} className={`Pagination_listItem ${isActive}`} onClick={this.onClick.bind(this, pageNumber)}><a>{pageNumber}</a></li>;
    }

    renderButtons() {
        var next, prev;
        var buttonClass = 'Pagination_button';
        var currentPage = this.currentPage();
        var numberOfPages = this.numberOfPages();

        if(currentPage > 1) {
            prev = <button className={`${buttonClass} ${buttonClass}-previous`} onClick={this.onClick.bind(this, currentPage - 1)}>{this.props.previousButton}</button>;
        }

        if(currentPage  < numberOfPages) {
            next = <button className={`${buttonClass} ${buttonClass}-next`} onClick={this.onClick.bind(this, currentPage + 1)}>{this.props.nextButton}</button>;
        }

        return (
            <div>{prev}{next}</div>
        );
    }
}

Pagination.propTypes = {
    length: PropTypes.number,
    page: PropTypes.number,
    amount: PropTypes.number,
    onClick: PropTypes.func,
    maxLinks: PropTypes.number,
    nextButton: PropTypes.string,
    previousButton: PropTypes.string,
    ellipsis: PropTypes.bool
};

Pagination.defaultProps = {
    length: 0,
    page: 1,
    amount: 25,
    maxLinks: 8,
    nextButton: 'next \u00bb',
    previousButton: '\u00ab prev',
    ellipsis: false
}; 

export default Pagination;