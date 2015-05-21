
var React = require('react');
var _ = require('lodash');

var Input = require('../components/Input');
var Grid = require('../components/Grid');
var Col = require('../components/Col');
var Transition = React.addons.CSSTransitionGroup;
var Button = require('../components/Button');


var TranstionTester = React.createClass({
    displayName: 'TranstitionTester',
    mixins: [
        require('../mixins/FormMixin')
    ],
    propTypes: {
        transitionName: React.PropTypes.string
    },
    FormMixin_initialFormData: function (nextState) {        
        nextState.formData = {
            currentItemIndex: 0
        };
        return nextState;
    },
    getInitialState: function () {
        return {
            removeItem: false
        };
    },
    onToggleClass: function () {
        this.setState({removeItem: !this.state.removeItem});
    },
    render: function() {
        return (
            <div className="padding">
                <Grid>
                    <Col>
                        <Transition transitionName={this.props.transitionName}>
                            {this.renderChildren()}
                        </Transition>
                    </Col>
                    <Col>
                        <Input name="currentItemIndex" type="number" onChange={this.FormMixin_onFormChange} className="l-50"></Input>
                        <Button className="l-50" onClick={this.onToggleClass}>Toggle</Button>
                    </Col>
                </Grid>
            </div>
        );
    },
    renderChildren: function () {
        return _.filter(this.props.children, function (ii, key){
            if (this.state.removeItem) {
                return key !== parseInt(this.state.formData.currentItemIndex, 10);
            }
            return true;
        }.bind(this));
    }
});

module.exports = TranstionTester;