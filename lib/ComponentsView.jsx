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
        return this.props.components.map((post,key) => {
            return <li key={key}>
                <h2>{post.data.displayName}</h2>
                <ul>{post.data.props.map((pp)=> <li>{pp.name}: {pp.type}</li>)}</ul>
            </li>;
        });
    }
});

module.exports = ComponentsView;
