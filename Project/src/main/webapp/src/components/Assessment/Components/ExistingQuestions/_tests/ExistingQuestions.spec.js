const React = require('react');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const ExistingQuestions = require('../ExistingQuestions.jsx').default;

describe('ExistingQuestions', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<ExistingQuestions/>);
        expect(component).toExist();
    });
});