import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import ImportEmails from '../ImportEmails.jsx';

describe('Import emails', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<ImportEmails />);

        expect(component).toExist();
    });
});