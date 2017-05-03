import React from 'react';
import ViewAudioQuestion from 'components/Questions/Question/View/QuestionContent/ViewAudioQuestion.jsx';
import ViewCodeQuestion from 'components/Questions/Question/View/QuestionContent/ViewCodeQuestion.jsx';
import ViewMultipleChoiceQuestion from 'components/Questions/Question/View/QuestionContent/ViewMultipleChoiceQuestion.jsx';
import ViewTextQuestion from 'components/Questions/Question/View/QuestionContent/ViewTextQuestion.jsx';
import ViewVideoQuestion from 'components/Questions/Question/View/QuestionContent/ViewVideoQuestion.jsx';

import ValueMatches from 'components/Questions/Question/_Components/ValueMatcher/ValueMatches.jsx';
import ValueMatcher from 'components/Questions/Question/_Components/ValueMatcher/ValueMatcher.jsx';

class ViewQuestion extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return  <div className="view-question-container">
                    <img src={"/resources/static/img/icons/"+this.props.Question.type+"-large.png"} className="question-icon" style={{height:"2.5em"}}/>
                    <ValueMatches __Value={this.props.Question.type} QuestionContent={this.props.Question.content || {}} >
                        <ValueMatcher match={"audio"} component={ViewAudioQuestion}/>
                        <ValueMatcher match={"code"} component={ViewCodeQuestion}/>
                        <ValueMatcher match={"multiple-choice"} component={ViewMultipleChoiceQuestion}/>
                        <ValueMatcher match={"text"} component={ViewTextQuestion}/>
                        <ValueMatcher match={"video"} component={ViewVideoQuestion}/>
                    </ValueMatches>
                    <div className="hint-display-container">
                        {this.props.Question.hasHint?this.props.Question.hint:null}
                    </div>
                </div>
    }
}
ViewQuestion.propTypes={
    Question:React.PropTypes.object.isRequired
};

export default ViewQuestion