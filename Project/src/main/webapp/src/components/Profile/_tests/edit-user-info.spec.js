const React = require('react');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const EditUserInfo = require('../EditUserInfo.jsx').default;

const user = {
    username: "User1",
    title: "Title1",
    organization: "Organization1",
    email: "my@email.com"
};

describe('Edit user info', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<EditUserInfo user={user}/>);

        expect(component).toExist();
    });
});