var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var AdminPreview = require('components/Assessment/Pages/ReviewPage/AdminReview.jsx').default;

const assessment = {questions: [
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
        // },
    // {
    //     type: "video",
    //     content: "{question: 'This is a video question 4'}"
    // },
    // {
    //     type: "audio",
    //     content: "{question: 'This is a audio question 5'}"
    
],};

//const assessment = {questions: questionsArray};

//TODO Need to Add Testing for new structure
// describe('Admin review', function() {
//
//     it('should render without problems', function () {
//         let component = TestUtils.renderIntoDocument(<AdminPreview assessment={assessment}/>);
//
//         expect(component).toExist();
//     });
// });