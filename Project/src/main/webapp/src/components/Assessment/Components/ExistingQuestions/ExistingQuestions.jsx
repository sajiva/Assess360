import React from 'react';
import ReactDom from 'react-dom';
import $ from 'jquery';
import EventHandler from '../../../../libaries/EventHandler.jsx';
import Rests from "../../../../libaries/Rest.jsx";
import ExistingQuestion from './Components/ExistingQuestion.jsx';

/**
 * @class ExistingQuestions
 * @description This renders existing questions
 */
class ExistingQuestions extends React.Component{
    constructor(props){
        super(props);
        let $this = this;
        this.myEventHandler = new EventHandler();

        this.myEventHandler.on('questions-loaded', function (eventData) {
            let questions = eventData.questions.map(function (question, index) {
                return question;
            });
            $this.setState({questions:questions});
        });

        this.state = {
            assessmentID: this.props.assessmentID,
            questions: [],
            pageSize:20
        };
    }
    render(){
        if(typeof this.state.questions=="undefined"){
            return (<div ref="Questions"></div>);
        }
        const assessmentID = this.props.assessmentID;
        const questions = this.state.questions.map(function (question, index) {
            return <ExistingQuestion key={index} assessmentID={assessmentID} question={question}/>
        });
        return(
            <div>
                <h2 className="existing-question-header">Add Existing Question</h2>
                <div className="assessment-questions-container">
                    <div className="assessment-questions-header-container">
                        <div className="assessment-questions-header-title">{this.state.questions.length} Questions</div>
                    </div>
                    <div className="assessment-questions-body">
                        {questions}
                    </div>
                </div>
            </div>
        );

    }
    componentDidMount(){
        setTimeout(this.getAllQuestions(), 2000);
    }

    getAllQuestions(){
        let $this = this;
        Rests.Lets().get('/rest/questions',{}, function (data) {
            $this.myEventHandler.trigger('questions-loaded', {questions:data})
        });
    }
}

export default ExistingQuestions;