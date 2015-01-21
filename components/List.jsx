/** @jsx React.DOM */
var React = require('react');
var _ = require('lodash');
var Transition = React.addons.CSSTransitionGroup;

var ClassMixin = require('../mixins/ClassMixin.jsx');

var List = React.createClass({
    displayName: 'List',
    mixins:[ClassMixin],
    propTypes: {
        type: React.PropTypes.string,
        wrapElements: React.PropTypes.bool,
        modifier: React.PropTypes.string,
        transition: React.PropTypes.bool,
        view: React.PropTypes.string
    },
    getInitialState: function () {
        return {
            viewHiddenItems: false
        };
    },
    getDefaultProps: function() {
        return {
            showAmmount: 2
        };
    },
    wrapListItems: function (children) {
        return _.chain(children)
            .map(function (value) {
                return <li>{value}</li>;
            })
            .compact(); 
    },
    showHiddenItems:function () {
        this.setState({viewHiddenItems: true});
    },
    render: function() {

        switch (this.props.view) {
            case 'hiddenItems':
                return this.renderHiddenItems();
            default: 
                return this.renderDefault();
        }
    },
    renderDefault: function () {
        var content;
        
        var classes = this.ClassMixin_getClass();
        classes.modifier(this.props.type);  

        if (this.props.transition) {
            content = (
                <Transition transitionName="list" className={classes.className} component="ul">
                    {this.props.children}
                </Transition>
            );
        }
        else if (this.props.wrapElements) {
            var children = _.chain(this.props.children)
                .map(function (value) {
                    return <li>{value}</li>;
                })
                .compact(); 

            content = <ul className={classes.className}>{children}</ul>;

        }
        else {
           content = (
               <ul className={classes.className}>
                   {this.props.children}
               </ul>
           ); 
        }

        return content;
    },
    renderHiddenItems: function () {
        var items, moreButton;
        var extraCount = this.props.children.length - this.props.showAmmount;

        if(this.state.viewHiddenItems) {
            items = this.props.children;
        } else {
            items = this.props.children.slice(0, this.props.showAmmount);
            if (extraCount > 0) {
                moreButton = <a className="t-hero" onClick={this.showHiddenItems}>+ {extraCount} more</a>;                
            }
        }

        return <ul className="List List-comma">{this.wrapListItems(items)} {moreButton}</ul>;
    }
});

module.exports = List;