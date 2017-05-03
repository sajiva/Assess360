var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
import Question from '../Question/Question.jsx';


describe('Question', function () {

    it('renders without problems', function () {
        var question = {
          'type': 'text',
          'content': {
            'Some text'
          }
        }
        var root = TestUtils.renderIntoDocument(<Question  Question={question}/>);

        expect(root).toExist();
    });
});
