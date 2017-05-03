import React from 'react';
import QuestionPreview from './QuestionPreview.jsx'

class AssessmentPreview extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let questions = null;
        let count = 0;

        if(typeof this.props.questions != "undefined"){
            questions = this.props.questions.map(function(question,index){
                return <QuestionPreview key={index} question={question} id={index+1}/>
            });

            count = this.props.questions.length;
        }

        return (
            <div className="assessment-questions-container">
                <div className="assessment-questions-header-container">
                    <div className="assessment-questions-header-title">
                        <span>{count}</span> Questions
                    </div>
                </div>
                <div className="assessment-questions-body">
                    {questions}
                </div>
            </div>
        );


    }
}

export default AssessmentPreview;