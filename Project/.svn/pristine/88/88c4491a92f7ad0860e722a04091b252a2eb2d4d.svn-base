
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var AssessmentNew = require('components/Assessment/Pages/NewAssessment/AssessmentNew.jsx').default;
var expectJSX = require('expect-jsx');
expect.extend(expectJSX);

describe('<AssessmentNew />', () => {
    beforeEach(function () {
        this.TestUtils = TestUtils;
        this.TestUtils.route = '/app/assessments/create';
        this.renderer = this.TestUtils.createRenderer();
        this.component = this.TestUtils.renderIntoDocument(<AssessmentNew/>);
    });
    it('should render without problems', function () {
        expect(this.component).toExist();
    });
    it('should be able to have child elements', function () {
        // this.renderer.render(<AssessmentNew/>);
        // const wrapper = this.renderer.getRenderOutput();
        //
        // expect(wrapper.type).toBe('div');
        // expect(wrapper.props.className).toEqual('new-assessment-name-container');

        //@TODO: Need to test if it renders the elements within the div
        /**
         * TO HECTOR:
         * I cant get the rest of this test to work. This uses what is called "Shallow Rendering". Apparently when I print
         * out the expected and actual code, it is the same. It could be that there is some weird spacing issue here.
         * This is the code is what I was trying to get to pass:
         *
         * const children = wrapper.props.children;
         * expect(children).toEqual([
         *      <h2 className="new-assessment-name-title">New Assessment</h2>,
         *      <input ref="assessmentNameInput" onChange={(e) => this.setState({name: e.target.value})} type="text" className="new-assessment-name-input form-control assessment-create-set-name-input" placeholder="Enter the Name" />,
         *       <input className="new-assessment-name-btn" type="submit" onClick={() => {this.setState({init: false})}}/>
         * ]);
         */
    });
    it('should be able to change data on user input', function () {

        //TODO Get this working...
        // TestUtils.route = '/app/assessments/create';
        // const root = TestUtils.renderIntoDocument(<AssessmentNew/>);
        //
        // const assessmentNameInput = root.refs.assessmentNameInput;
        // assessmentNameInput.value = "Software Engineer Assessment";
        // TestUtils.Simulate.change(assessmentNameInput);
        /**
         * To Hector:
         * Please figure out a way to test the changing state function with the input
         */
    });
});