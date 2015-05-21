/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var Pagination = React.createClass({
    displayName: 'Pagination',
    mixins: [
        require('../mixins/ClassMixin')
    ],
    propTypes: {
        ammount: React.PropTypes.number,
        length: React.PropTypes.number,
        page: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            length: 0,
            page: 0,
            ammount: 25,
            offset: 0,
            maxLinks: 8,
            nextButton: 'next \u00bb',
            previousButton: '\u00ab prev'
        };
    },
    onClick(page, e) {
        if(this.props.onClick) {
            this.props.onClick(e, page);
        }
    },
    render: function () {
        var numberOfPages = Math.ceil(this.props.length / this.props.ammount);
        this.classes = this.ClassMixin_getClass('Pagination');

        if(numberOfPages === 1) {
            return null;
        }

        return <div className={this.classes.className}>
            {this.renderButtons(numberOfPages)}
            <ul className={this.classes.child('list')}>
                {this.renderLinks(numberOfPages)}
            </ul>
        </div>;
    },
    numberOfPages() {
        return Math.ceil(this.props.length / this.props.ammount);
    },
    currentPage() {
        // If the user supplies a page that is too large select the last page.
        return (this.props.page < this.numberOfPages()) ? this.props.page : this.numberOfPages() -1;
    },
    renderLinks(numberOfPages) {
        var arrayObject;

        var leftSide  = this.props.maxLinks / 2;
        var rightSide = this.props.maxLinks - leftSide;


        // Straight up 0 to maxLinks
        if(numberOfPages <= this.props.maxLinks) {
            arrayObject = _(numberOfPages).range();
        }
        // fancy stuff
        else {
            if (this.currentPage() > numberOfPages - this.props.maxLinks / 2) {
                rightSide = numberOfPages - this.currentPage();
                leftSide  = this.props.maxLinks - rightSide;
            }
            else if (this.currentPage() < this.props.maxLinks / 2) {
                leftSide  = this.currentPage();
                rightSide = this.props.maxLinks - leftSide;
            }

            arrayObject = _(this.currentPage() - leftSide).range(this.currentPage() + rightSide);

            if(this.currentPage() > this.props.maxLinks / 2) {
                arrayObject = _([0, '...'].concat(arrayObject.value()));
            }

            if(this.currentPage() < numberOfPages - this.props.maxLinks / 2) {
                arrayObject = _(arrayObject.value().concat(['...', numberOfPages -1]));
            }
        }
        return arrayObject.map(this.renderItem).value();
    },
    renderButtons(numberOfPages) {
        var next, prev;
        var buttonClass = this.classes.child('button');

        if(this.currentPage() > 0) {
            prev = <button className={`${buttonClass} ${buttonClass}-previous`} onClick={this.onClick.bind(this, this.currentPage() - 1)}>{this.props.previousButton}</button>;
        }

        if(this.currentPage() <= numberOfPages) {
            next = <button className={`${buttonClass} ${buttonClass}-next`} onClick={this.onClick.bind(this, this.currentPage() + 1)}>{this.props.nextButton}</button>;
        }

        return (
            <div>{prev}{next}</div>
        );
    },
    renderItem(item, key) {
        var className = this.classes.child('listItem');
        var isActive = (item === this.currentPage()) ? 'is-active' : '';
        if (item === '...') {
            return <li key={key} className={className}>...</li>;
        }
        return <li key={key} className={`${className} ${isActive}`} onClick={this.onClick.bind(this, item)}><a>{item + this.props.offset}</a></li>;
    }
});

module.exports = Pagination;
