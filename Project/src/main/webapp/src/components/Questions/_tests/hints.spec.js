var React = require('react');
var TestUtils = require('react-dom/lib/ReactTestUtils');
var expect = require('expect');
import HintsDropdown from 'components/Questions/Question/_Components/Hint/HintDropdown.jsx';

describe('Is there Hints test', function () {
    it('renders without problems', function () {

        var root = TestUtils.renderIntoDocument(<HintsDropdown />);

        expect(root).toExist();
    });
});
