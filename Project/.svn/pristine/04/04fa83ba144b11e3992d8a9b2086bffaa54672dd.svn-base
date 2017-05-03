var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var AssessmentTable = require('../AssessmentTable.jsx').default;

describe('AssessmentTable', function() {

    it('should render without problems', function () {
    	TestUtils.route='/app/assessments';
        let component = TestUtils.renderIntoDocument(<AssessmentTable />);

        expect(component).toExist();
    });
});