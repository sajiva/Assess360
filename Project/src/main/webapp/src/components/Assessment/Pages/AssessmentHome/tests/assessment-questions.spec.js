import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import AssessmentQuestions from '../Components/AssessmentQuestions.jsx';

const assessment = {
    id: 1,
    name: "assessment1",
    questionSet: [{
        type: "text",
        content: {question: 'This is a text question'}
    }]
};

describe('Assessment questions', function() {

    it('should render without problems', function () {
        let component = TestUtils.renderIntoDocument(<AssessmentQuestions Assessment={assessment}/>);

        expect(component).toExist();
    });
});