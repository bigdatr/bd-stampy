/** @jsx React.DOM */
var React = require('react');

var ComponentsView = React.createClass({
    displayName: 'ComponentsView',
    render: function () {
        return (
            <div>
                <ul>
                    {this.renderPosts()}
                </ul>
            </div>
        );
    },
    renderPosts() {
        return this.props.components.map((cc,key) => {

            return <li key={key}>
                <h2>{cc.data.displayName}</h2>
                <ul>{cc.data.props.map((pp, key)=> <li key={key}><strong>{pp.name}</strong>: {pp.type}</li>)}</ul>
            </li>;
        });
    }
});

module.exports = ComponentsView;
