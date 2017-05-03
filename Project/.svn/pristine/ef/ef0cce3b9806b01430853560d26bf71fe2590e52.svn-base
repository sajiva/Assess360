
var React = require('react');
var TestUtils = require('react-addons-test-utils');//'react-dom/lib/ReactTestUtils'); //I like using the Test Utils, but you can just use the DOM API instead.
var expect = require('expect');
var Table = require('../Table.jsx').default; //my root-test lives in components/__tests__/, so this is how I require in my components.

const data = [{
	"name": "Software Analyst",
	"questionSet": [{"type":"text", "content": "Question Text"},
	{"type":"code", "content": "Question Code"},
	{"type":"multiple-choice", "content": "Question Multi"},
	{"type":"video", "content": "Question Video"},
	{"type":"audio", "content": "Question Audio"}
	]

},{
	"name": "Software Analyst2",
	"questionSet": [{"type":"text", "content": "Question Text"},
	{"type":"code", "content": "Question Code"},
	{"type":"multiple-choice", "content": "Question Multi"},
	{"type":"video", "content": "Question Video"},
	{"type":"audio", "content": "Question Audio"}
	]

},{
	"name": "Software Analyst3",
	"questionSet": [{"type":"text", "content": "Question Text"},
	{"type":"code", "content": "Question Code"},
	{"type":"multiple-choice", "content": "Question Multi"},
	{"type":"video", "content": "Question Video"},
	{"type":"audio", "content": "Question Audio"}
	]

}];

describe('Is the Heading There', function () {
    it('renders without problems', function () {
        var root = TestUtils.renderIntoDocument(<Table  data={data}/>);

        expect(root).toExist();
    });
});

