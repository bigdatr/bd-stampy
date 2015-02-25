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
        length: React.PropTypes.array,
        page: React.PropTypes.number
    },
    getDefaultProps: function () {
        return {
            length: 0,
            page: 0,
            ammount: 25,
            nextButton: 'next &raquo;',
            previousButton: '&laquo; prev'
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

        if(numberOfPages === 0) {
            return null;
        }

        return <div className={this.classes.className}>
            {this.renderButtons(numberOfPages)}
            <ul className={this.classes.child('list')}>
                {_(numberOfPages).range().map(this.renderItem).value()}
            </ul>
        </div>;
    },
    renderButtons(numberOfPages) {
        var next, prev;
        var buttonClass = this.classes.child('button');

        if(this.props.page > 0) {
            prev = <button className={`${buttonClass} ${buttonClass}-previous`} onClick={this.onClick.bind(this, this.props.page - 1)}>{this.props.previousButton}</button>;
        }
        
        if(this.props.page <= numberOfPages) {
            next = <button className={`${buttonClass} ${buttonClass}-next`} onClick={this.onClick.bind(this, this.props.page + 1)}>{this.props.nextButton}</button>;
        }
        
        return (
            <div>{prev}{next}</div>
        );
    },
    renderItem(item) {
        var className = this.classes.child('listItem');
        var isActive = (item === this.props.page) ? 'is-active' : '';
        return <li className={`${className} ${isActive}`} onClick={this.onClick.bind(this, item)}><a>{item}</a></li>;
    }
});

module.exports = Pagination;