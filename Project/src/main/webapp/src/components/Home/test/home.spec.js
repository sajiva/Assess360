var React = require('react');
var TestUtils = require('react-addons-test-utils');//'react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect = require('expect');
var Home = require('../Home.jsx').default;


describe('Is there Home test', function () {
    it('renders without problems', function () {

        var root = TestUtils.renderIntoDocument(<Home />);

        expect(root).toExist();
    });
});
