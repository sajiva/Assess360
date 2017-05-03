const React = require('react');
const TestUtils = require('react-addons-test-utils');
const expect = require('expect');
const AssessmentPreview = require('../AssessmentPreview.jsx').default;

const questions = [
    {
        type: "text",
        content: {question: 'This is a text question'}
    },
    {
        type: "code",
        content: {question: 'This is a code question'}
    },
    {
        type: "multiple-choice",
        content: {question: 'This is a multiple choice question 1', choices:[{text:'choice1',letter:'A'},{text:'choice2',letter:'B'}]}
    },
    {
        type: "multiple-choice",
        content: {question: 'This is a multiple choice question 2'}
        // },
    // {
    //     type: "video",
    //     content: "{question: 'This is a video question 4'}"
    // },
    // {
    //     type: "audio",
    //     content: "{question: 'This is a audio question 5'}"
    }
];

//TODO Need to Add Testing for new structure
// describe('Assessment preview', function() {
//
//     it('should render without problems', function () {
//         let component = TestUtils.renderIntoDocument(<AssessmentPreview questions={questions}/>);
//
//         expect(component).toExist();
//     });
// });