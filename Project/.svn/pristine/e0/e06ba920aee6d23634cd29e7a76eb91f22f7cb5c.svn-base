import React from 'react';
import Questions from "components/Questions/Questions.jsx";
import AnsweredQuestionsHeader from 'components/Assessment/Pages/AssessmentHome/Components/AnsweredQuestionsHeader.jsx';

class AssessmentQuestions extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (<div className="assessment-questions-container">
            <AnsweredQuestionsHeader AssessmentID={this.props.Assessment["id"]} Questions={this.props.Assessment["questionSet"]}/>
            <div className="assessment-questions-body">
                <Questions questions={this.props.Assessment["questionSet"]}/>
            </div>
        </div>);
    }
}
AssessmentQuestions.propTypes={
    Assessment:React.PropTypes.object
};


export default AssessmentQuestions