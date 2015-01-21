/** @jsx React.DOM */
/**
 * TabView
 *
 * @param {String} example  
    <TabView defaultTab={1}>

        <Tab>Tab 1</Tab>
        <Tab data-icon="&#xE086;">Tab 2</Tab>
        <Tab>Tab 3</Tab>

        <TabContent>
            <h3>Tab Content 1</h3>
            <p>Inert HTML Content here</p>
        </TabContent>

        <TabContent>
            <h3>Tab Content 2</h3>
            <p>Inert HTML Content here</p>
            <p>Inert HTML Content here</p>
        </TabContent>

        <TabContent>
            <h3>Tab Content 3</h3>
            <p>Inert HTML Content here</p>
            <p>Inert HTML Content here</p>
            <p>Inert HTML Content here</p>
        </TabContent>
        
    </TabView>

 */
var React = require('react/addons');
var Transition = React.addons.CSSTransitionGroup;
var ClassMixin = require('../mixins/ClassMixin.jsx');


var TabView = React.createClass({
    displayName: 'TabView',
    mixins: [ClassMixin],
    propTypes: {
        defaultTab: React.PropTypes.number,
        text: React.PropTypes.string,
        transition: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            tabindex: this.props.defaultTab || 1
        };
    },
    getDefaultProps: function() {
        return {
            transition: true,
            direction: 'right'
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.defaultTab) {
            this.setState({tabindex: nextProps.defaultTab});
        }
    },
    onTabChange: function(tabindex) {
        if(this.props.onChange) {
            this.props.onChange(tabindex, this.updateChildProps());
        }
        this.props.direction = (tabindex > this.state.tabindex) ? 'left' : 'right';
        this.setState({tabindex: tabindex});
    },
    updateChildProps: function() {
        var tabGroup = [];
        var tabContentGroup = [];
        var tabExcludedGroup = [];

        React.Children.forEach(this.props.children, function(c) {
            var t,
                type = c.type.displayName || c.type;

            

            if (type === 'Tab' && !c.props.exclude) {
                t = tabGroup.push(c);
                c.props.tabindex = t;
                c.props.onTabChange = this.onTabChange;
            } else if (c.props.exclude) {
                t = tabExcludedGroup.push(c);
            } else if (type === 'TabContent') {
                t = tabContentGroup.push(c);
            }
        }.bind(this));

        return {
            tabGroup: tabGroup,
            tabContentGroup: tabContentGroup,
            tabExcludedGroup: tabExcludedGroup
        };
    },
    render: function() {
        var groups = this.updateChildProps();
        var classes = this.ClassMixin_getClass('TabGroup');


        return (
            <div className="TabView">
                <ul className={classes.className}>
                    {this.renderTab(groups.tabGroup)}
                    {this.renderExcluded(groups.tabExcludedGroup)}
                </ul>
                {this.renderTabContent(groups.tabContentGroup)}
                
            </div>
        );
    },
    renderTab: function(tabGroup) {
        return tabGroup.map(function(t, i) {
            return <li key={i} className={this.state.tabindex === (i+1) ? 'is-active' : ''} onClick={this.onTabChange.bind(this, (i+1))}>{t}</li>;
        }.bind(this));
    },
    renderExcluded: function(tabExcludedGroup) {
        return tabExcludedGroup.map(function(t, i) {
            return <li className="is-excluded" key={i}>{t}</li>;
        }.bind(this));
    },
    renderTabContent: function(tabContentGroup) {

        var content =  tabContentGroup.map(function(t, i) {
            if (this.state.tabindex === (i+1)) {
                return <div key={i} className={this.state.tabindex === (i+1) ? 'is-active' : 'is-invisible'}>{t}</div>;                
            }

            return null;
        }.bind(this));
        if(this.props.transition) {
            return <Transition transitionName={"slide-" + this.props.direction} className="TabContentGroup" component={React.DOM.div}>
                {content}
            </Transition>;
        }
        return content;
    }
});

module.exports = TabView;