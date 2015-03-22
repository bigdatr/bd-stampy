/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var ComponentsView = React.createClass({
    displayName: 'ComponentsView',
    render: function () {
        return (
            <div className="Row">
                <div className="Nav">
                    <h1>Stampy</h1>
                    <ul> {this.renderNav()} </ul>
                </div>
                <ul className="Content">
                    {this.renderComponents()}
                </ul>
            </div>
        );
    },
    renderNav() {
        return this.props.components.map((cc,key) => {
            return <li key={key}>
                <a href={`#${cc.data.displayName}`}>{cc.data.displayName}</a>
            </li>;
        });
    },
    renderComponents() {
        return this.props.components.map((cc,key) => {
            return <li key={key} id={""+cc.data.displayName}>
                <h2>{cc.data.displayName}</h2>

                <p>{cc.data.description}</p>

                {this.renderProps(cc.data.props)}
                <hr/>
            </li>;
        });
    },
    renderProps(props){
        if(!_.isEmpty(props)){
            return <div>
                <h3>Props</h3>
                <table className="PropsTable">
                    <thead>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Default Value</th>
                        <th>Comment</th>
                    </thead>

                    {_.map(props, (pp, key)=> {
                        var defaultValue = (pp.defaultValue) ? <code>{pp.defaultValue}</code> : '';
                        var type = (pp.type) ? <code>{pp.type}</code> : '';

                        return <tr key={key}>
                            <td className="l-20"><strong>{key}</strong></td>
                            <td className="l-20">{type}</td>
                            <td className="l-20">{defaultValue}</td>
                            <td >{pp.description}</td>
                        </tr>;
                })}
                </table>
            </div>
        }
    }
});

module.exports = ComponentsView;
