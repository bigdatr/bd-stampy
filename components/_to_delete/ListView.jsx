/** @jsx React.DOM */
/**
 * ListView
 *
 * @param {String} example  <ListView title="My List Name">
      <ListItemView text="Item 1" data-icon="&#xE086;"></ListItemView>
      <ListItemView text="Item 2" data-icon="&#xE086;"></ListItemView>
      <ListItemView text="Item 3" subtext="This is some sexy subtext!"></ListItemView>
      <ListItemView text="Item 4"></ListItemView>
    </ListView>
 */
var React = require('react');
var ListView = React.createClass({
    displayName: 'ListView',
    render: function() {
        return (
            <ul className="List--process">
                {this.props.children}
            </ul>
        );
    }
});

module.exports = ListView;