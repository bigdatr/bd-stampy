/**
 * @jsx React.DOM
 */

var React = require('react');
var Icon = require('./Icon');

var FilterBar = React.createClass({
    displayName: 'FilterBar',
    propTypes: {
        filters: React.PropTypes.array.isRequired,
        active: React.PropTypes.string,
        activeClass: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            activeClass: 'is-active',
        };
    },
    render: function() {
        return (
            <div className={this.props.className}>
                {this.renderFilters(this.props.filters)}
            </div>
        );
    },
    onClick: function (filter, e) {
        if(this.props.onClick) {
            this.props.onClick(e, {key: this.props.name, value:filter});
        }
    },
    renderFilters: function(filters) {
        var active = this.props.active || filters[0];
        return filters.map(function(filter, key){
            var activeClassName = (active === filter) ? this.props.activeClass: '';
            return <Icon
                key={key}
                className={activeClassName}
                modifier="inline"
                sytle="cursor:pointer"
                name={filter}
                onClick={this.onClick.bind(this, filter)}
            />;
        }.bind(this));
    }
});

module.exports = FilterBar;
