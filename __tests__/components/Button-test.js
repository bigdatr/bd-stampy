/** @jsx React.DOM */

var base_path = '../../';
var path = base_path + 'components/Button.jsx';

jest.dontMock(path);

describe('Button', function() {

    it('displays the text label', function() {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var Button = require(path);

        var _dom = TestUtils.renderIntoDocument(<Button>Save Me</Button>);

        expect(_dom.getDOMNode().textContent).toEqual('Save Me');
    });

    it('default to an html <button />', function() {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var Button = require(path);

        var _dom = TestUtils.renderIntoDocument(<Button href="/myLink">Save Me</Button>);

        expect(_dom.getDOMNode().tagName).toEqual('A');
    });

    it('changes to an html <a href="..." /> is href is provided', function() {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var Button = require(path);

        var _dom = TestUtils.renderIntoDocument(<Button href="/myLink">Save Me</Button>);

        expect(_dom.getDOMNode().tagName).toEqual('A');
    });

    it('adds color class modifier', function() {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var Button = require(path);

        var _dom = TestUtils.renderIntoDocument(<Button color="blue">Save Me</Button>);
        expect(_dom.getDOMNode().className).toContain('Button-blue');

        _dom = TestUtils.renderIntoDocument(<Button disabled={true}>Save Me</Button>);
        expect(_dom.getDOMNode().className).toContain('Button-grey');
    });

    it('toggles when clicked', function() {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var Button = require(path);

        var _dom = TestUtils.renderIntoDocument(<Button toggle={true}>Toggle Me</Button>);
        expect(_dom.getDOMNode().className).toContain('Button-grey');

        TestUtils.Simulate.click(_dom.getDOMNode());
        expect(_dom.getDOMNode().className).not.toContain('Button-grey');

        TestUtils.Simulate.click(_dom.getDOMNode());
        expect(_dom.getDOMNode().className).toContain('Button-grey');
    });

});



