const React = require('react');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const UserProfile = require('../UserProfile.jsx').default;

describe('User profile', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<UserProfile/>);

        expect(component).toExist();
    });
});