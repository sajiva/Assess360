import React from 'react';
import AssessmentAPI from 'libaries/APIs/AssessmentAPI.jsx';
import {Link} from 'react-router';
class AnsweredQuestionsHeader extends React.Component{
    constructor(props){
        super(props);
        this.refreshClick=this.refreshClick.bind(this);
    }
    refreshClick(){
        AssessmentAPI.instance.initiate("get-assessment", {assessmentID:this.props.AssessmentID});
    }
    render(){
        return <div className="assessment-questions-header-container">
            <div className="assessment-questions-header-add-container">
                <span onClick={this.refreshClick} className="btn assessment-questions-container-add-btn">
                    <span className="glyphicon glyphicon-refresh"/>
                    Refresh
                </span>
                <Link to={"/app/assessments/"+this.props.AssessmentID+"/add-question"} className={"btn assessment-questions-container-add-btn"} onlyActiveOnIndex={false}>
                    <span className="glyphicon glyphicon-plus"/>
                    Add
                </Link>
            </div>
            <div className="assessment-questions-header-title">
                {this.props.Questions.length} Questions
            </div>
        </div>;
    }
}
AnsweredQuestionsHeader.propTypes={
    AssessmentAPI:React.PropTypes.number,
    Questions:React.PropTypes.array
};

export default AnsweredQuestionsHeader;