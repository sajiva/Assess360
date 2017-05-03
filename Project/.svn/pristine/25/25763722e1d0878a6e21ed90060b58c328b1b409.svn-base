import React from 'react';
import SimpleAnswerChoices from 'components/Questions/Question/_Components/MultipleChoiceTools/SimpleAnswerChoices.jsx';
class ViewMultipleChoiceQuestion extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            QuestionContent:this.props.QuestionContent
        };
    }
    render()
    {
        return  <div className="multiple-choice-question">
                   <span className="question-question-content">{this.state.QuestionContent.question}</span>
                   <SimpleAnswerChoices Choices={this.state.QuestionContent.choices || []}/>
                </div>
    }
}

ViewMultipleChoiceQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};
export default ViewMultipleChoiceQuestion