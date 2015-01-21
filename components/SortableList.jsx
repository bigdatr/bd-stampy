/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var SortBy = React.createClass({
    displayName: 'SortBy',
    propTypes: {
        renderItems: React.PropTypes.func,
        renderTitles: React.PropTypes.func,
        items: React.PropTypes.array,
        groupBy: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {
            // component: React.DOM.ul
        };
    },
    render: function () {
        var items = _.groupBy(this.props.items, this.props.groupBy);
        
        var groupedValues = _.map(items, function(group, key){
            var listItems = _.map(group, function(groupItem, key2){
                return (this.props.renderItems(groupItem, key2));
            }, this);

            return <div key={key}>
                {this.props.renderTitles(key)}
                <ul className={this.props.listClassName}>{listItems}</ul>
            </div>;
        }, this);

        return <div>{groupedValues}</div>;
    }
});

module.exports = SortBy;