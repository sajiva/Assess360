var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var ImportParticipants = require('../ImportParticipants.jsx').default;

describe('Import participants', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<ImportParticipants />);

        expect(component).toExist();
    });
});