/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');

var Tag = require('stampy/src/components/Tag');

var ColumnDataTable = React.createClass({
    displayName: 'ColumnDataTable',
    propTypes: {
        data: React.PropTypes.array,
        headers: React.PropTypes.array
    },
    // shouldComponentUpdate: function (nextProps) {
    //     // Has a fairly nested structure;
    //     // data[].series[]

    //     if(this.props.data) {
    //         _.each(nextProps.data, function (dd, key){
    //             _.each(dd.series, function(series, subkey){
    //                 if(series !== this.props.data[key].series[subkey]) {
    //                     return true;
    //                 }
    //             }, this);    
    //         }, this);            
    //     }
        
    //     return false;  
    // },
    render: function () {
        return (
            <table className="ColumnDataTable">
                <tbody>
                    <tr>
                        <td className="ColumnDataTable_header">
                            <ul>
                                {this.renderListItems(this.props.headers)}
                            </ul>
                        </td>
                        {this.renderRows(this.props.data)}
                    </tr>
                </tbody>
            </table>
        );
    },
    renderListItems: function (items) {
        return _.map(items, function (item, key) {
            return <Tag key={key} data={item} component="li"/>;
        });
    },
    renderRows: function (data) {
        return _.map(data, function (dd, key) {
            return <td key={key}>
                <ul>{this.renderListItems(dd.series)}</ul>
            </td>;
        }, this);
    }
});

module.exports = ColumnDataTable;