/**
 * @jsx React.DOM
 */

var React = require('react');
var Icon = require('./Icon');


console.warn('bd-stampy/components/FilterBar.jsx', 'Will be deprecated soon');

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
    onClick: function (filter, e) {
        if(this.props.onClick) {
            this.props.onClick(e, {key: this.props.name, value:filter});
        }
    },
    render: function() {
        return (
            <div className={this.props.className}>
                {this.renderFilters()}
            </div>
        );
    },
    renderFilters: function() {
        var active = this.props.active || this.props.filters[0];
        var cursorStyle = {
           cursor: 'pointer'
        };

        return this.props.filters.map(function(filter, i){
            var activeClassName = (active === filter) ? this.props.activeClass: '';

            return <Icon
                key={i}
                className={activeClassName}
                modifier="inline"
                style={cursorStyle}
                name={filter}
                onClick={this.onClick.bind(this, filter)}
            />;
        }.bind(this));
    }
});

module.exports = FilterBar;
