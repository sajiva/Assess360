var React = require('react');
var TestUtils = require('react-addons-test-utils');//'react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect = require('expect');
var AssessmentTimer = require('../AssessmentTimer.jsx').default;

describe('Is there a way to set Time? ', function () {
    it('renders without problems', function () {

        var root = TestUtils.renderIntoDocument(<AssessmentTimer />);

        expect(root).toExist();
    });
});