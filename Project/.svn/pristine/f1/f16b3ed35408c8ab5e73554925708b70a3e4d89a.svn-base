

/***************************************************************************/
/* Hector - Start Here                                                     */
/***************************************************************************/
var $ = require('jquery');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var Assessment = require('components/Assessment/Assessment.jsx').default;
var expectJSX = require('expect-jsx');
var ReactDOM = require('react-dom');

//TODO Need to Add Testing for new structure
// import QuestionTypes from "../../Questions/QuestionTypes.jsx";
//
// import ExistingQuestions from '../ExistingQuestions.jsx';
// import AssessmentPreview from '../Preview/AssessmentPreview.jsx';
//
//
//
// const MultipleChoiceDisplay=QuestionTypes.MultipleChoiceQuestion.Display;
// const MultipleChoiceCreator=QuestionTypes.MultipleChoiceQuestion.Creator;
// const CodeQuestionDisplay=QuestionTypes.CodeQuestion.Display;
// const CodeQuestionCreator=QuestionTypes.CodeQuestion.Creator;
// const VideoQuestionDisplay=QuestionTypes.VideoQuestion.Display;
// const VideoQuestionCreator=QuestionTypes.VideoQuestion.Creator;
// const TextQuestionDisplay=QuestionTypes.TextQuestion.Display;
// const TextQuestionCreator=QuestionTypes.TextQuestion.Creator;
// const AudioQuestionDisplay=QuestionTypes.AudioQuestion.Display;
// const AudioQuestionCreator=QuestionTypes.AudioQuestion.Creator;

expect.extend(expectJSX);


var clickBtn_TestTitle=function($this,root,btnClass, titleStr){
    var btn = TestUtils.findRenderedDOMComponentWithClass(root,btnClass);
    expect(btn).toExist();
    $this.TestUtils.Simulate.click(btn);
    var headingTitle = ReactDOM.findDOMNode(root.headingTitle);
    expect(headingTitle.innerText).toEqual(titleStr);
};
var clickBtn_TestType=function($this,root,btnClass, type){
    var btn = TestUtils.findRenderedDOMComponentWithClass(root,btnClass);
    expect(btn).toExist();
    $this.TestUtils.Simulate.click(btn);
    var allTypes = TestUtils.scryRenderedComponentsWithType(root,type);
    expect(allTypes).toBeAn('array');
    expect(allTypes.length).toBe(1);

};
describe('<Assessment/>', () => {



    beforeEach(function () {
        this.TestUtils = TestUtils;
        this.TestUtils.route = '/app/assessments/1';
        this.renderer = this.TestUtils.createRenderer();
        this.component = this.TestUtils.renderIntoDocument(<Assessment params={{assessmentID:2}}/>);

    });

    it('should render without problems', function () {
        expect(this.component).toExist();
    });

    //TODO Need to Add Testing for new structure
    // Commenting Out Since The Layout is completly different... Need to finish this once the rest of the team has the new stuff
    // it('Can deal with the complex flow that was specified in SHRPAS', function () {
    //     const root = TestUtils.renderIntoDocument(<Assessment params={{assessmentID:1}}/>);
    //
    //     /*******************************************************************/
    //     /* The Basic Flow of Go to questions and creating question         */
    //     /*******************************************************************/
    //     clickBtn_TestTitle(this,root,'assessment-questions-container-add-btn','New/Existing Question');
    //     clickBtn_TestTitle(this,root,'add-new-question-btn','Add a Question');
    //     clickBtn_TestType (this,root,'text-selection',TextQuestionCreator);
    //     clickBtn_TestType (this,root,'code-selection',CodeQuestionCreator);
    //     clickBtn_TestType (this,root,'video-selection',VideoQuestionCreator);
    //     clickBtn_TestType (this,root,'audio-selection',AudioQuestionCreator);
    //     clickBtn_TestType (this,root,'multiple-choice-selection',MultipleChoiceCreator);
    //     clickBtn_TestTitle(this,root,'next-btn',"New Assessment");
    //
    //     /*******************************************************************/
    //     /* Go Back from Add a Question                                     */
    //     /*******************************************************************/
    //     clickBtn_TestTitle(this,root,'assessment-questions-container-add-btn','New/Existing Question');
    //     clickBtn_TestTitle(this,root,'add-new-question-btn','Add a Question');
    //     clickBtn_TestTitle(this,root,'back-btn','New/Existing Question');
    //     clickBtn_TestTitle(this,root,'back-btn',"New Assessment");
    //
    //     /*******************************************************************/
    //     /* The Basic Flow of Go to Existing Questions                      */
    //     /*******************************************************************/
    //     clickBtn_TestTitle(this,root,'assessment-questions-container-add-btn','New/Existing Question');
    //
    //     clickBtn_TestTitle(this,root,'add-existing-question-btn',"Choose Existing Question");
    //     clickBtn_TestTitle(this,root,'back-btn','New/Existing Question');
    //
    //     clickBtn_TestType (this,root,'add-existing-question-btn', ExistingQuestions);
    //     clickBtn_TestTitle(this,root,'back-btn','New/Existing Question');
    //     clickBtn_TestTitle(this,root,'back-btn','New Assessment');
    //
    //   //TODO Add the Selection of a Question and the test of the next btn being disabled then enabled
    //
    //     /*******************************************************************/
    //     /* Preview Btn Functionality                                       */
    //     /*******************************************************************/
    //     clickBtn_TestTitle(this,root,'top-header-preview-container',"Preview Assessment");
    //     clickBtn_TestTitle(this,root,'back-btn',"New Assessment");
    //
    //     clickBtn_TestType (this,root,'top-header-preview-container',AssessmentPreview);
    //     clickBtn_TestTitle(this,root,'back-btn',"New Assessment");
    //
    //     clickBtn_TestTitle(this,root,'top-header-preview-container',"Preview Assessment");
    //     clickBtn_TestTitle(this,root,'next-btn',"New Assessment");
    //
    //
    //     //TODO, A detailed html layout needs to be done... How to do it I know, time to I dont.
    //     //TODO off to study fo Numerical Methods.
    //
    //
    //
    // });
});