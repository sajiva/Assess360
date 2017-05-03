
var React = require('react');
var TestUtils = require('react-addons-test-utils');//'react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect = require('expect');
var Header = require('../Header.jsx').default; //my root-test lives in components/__tests__/, so this is how I require in my components.


describe('Is the Heading There', function () {
    it('renders without problems', function () {
        TestUtils.route='/app/assessments';
        var root = TestUtils.renderIntoDocument(<Header />);

        expect(root).toExist();
    });
});

