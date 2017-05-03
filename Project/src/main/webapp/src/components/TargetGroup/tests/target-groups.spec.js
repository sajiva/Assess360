var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var TargetGroups = require('../TargetGroups.jsx').default;

describe('Target groups', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<TargetGroups />);

        expect(component).toExist();
    });
});