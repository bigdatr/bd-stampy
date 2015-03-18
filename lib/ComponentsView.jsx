/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

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

                <p>{cc.data.description}</p>

                {this.renderProps(cc.data.props)}
                <hr/>
            </li>;
        });
    },
    renderProps(props){
        if(!_.isEmpty(props)){
            console.log(props);
            return <div>
                <h3>Props</h3>
                <table className="Table Table-data">
                    <thead>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default Value</th>
                        <th>Comment</th>
                    </thead>

                    {_.map(props, (pp, key)=> {
                    return <tr key={key}>
                        <td><strong>{key}</strong></td>
                        <td><pre>{pp.type}</pre></td>
                        <td><pre>{pp.defaultValue}</pre></td>
                        <td>{pp.description}</td>
                    </tr>;
                })}
                </table>
            </div>
        }
    }
});

module.exports = ComponentsView;
