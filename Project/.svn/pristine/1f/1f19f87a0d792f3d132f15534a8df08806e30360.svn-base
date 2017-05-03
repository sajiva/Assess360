import React from 'react';
import $ from 'jquery';
import ValueMatches from 'components/Questions/Question/_Components/ValueMatcher/ValueMatches.jsx';
import ValueMatcher from 'components/Questions/Question/_Components/ValueMatcher/ValueMatcher.jsx';
import EditAudioQuestion from 'components/Questions/Question/Edit/QuestionContent/EditAudioQuestion.jsx';
import EditCodeQuestion from 'components/Questions/Question/Edit/QuestionContent/EditCodeQuestion.jsx';
import EditMultipleChoiceQuestion from 'components/Questions/Question/Edit/QuestionContent/EditMultipleChoiceQuestion.jsx';
import EditTextQuestion from 'components/Questions/Question/Edit/QuestionContent/EditTextQuestion.jsx';
import EditVideoQuestion from 'components/Questions/Question/Edit/QuestionContent/EditVideoQuestion.jsx';
import BasicDetails from 'components/Questions/Question/Edit/BasicDetails.jsx';
class EditQuestion extends React.Component{

    constructor(props){
        super(props);
        this.state={
            HasError:false,
            Error:"",
            Question:this.props.Question
        };

        this.updateQuestionContent=this.updateQuestionContent.bind(this);
        this.updateQuestion=this.updateQuestion.bind(this);
    }
    updateQuestionContent(data){
        this.updateQuestion({content:data});
    }
    updateQuestion(data)
    {
        debug("EditQuestion -> Update Question Data",data);

        let newQuestionData=$.extend(true,this.state.Question,data);

        /*******************************************************************/
        this.setState( { Question:newQuestionData },()=>
        {
            this.props.onChanged(this.state.Question)
        });
    }
    render(){
        return <div className="edit-question-container">
                   <BasicDetails onChanged={this.props.onChanged} Type={this.props.Type} Question={this.props.Question}/>
                   <div className="editable-question-content">
                       <ValueMatches __Value={this.props.Type} QuestionContent={this.state.Question.content || {}} onChanged={this.updateQuestionContent}>
                            <ValueMatcher match={"audio"} component={EditAudioQuestion}/>
                            <ValueMatcher match={"code"} component={EditCodeQuestion}/>
                            <ValueMatcher match={"multiple-choice"} component={EditMultipleChoiceQuestion}/>
                            <ValueMatcher match={"text"} component={EditTextQuestion}/>
                            <ValueMatcher match={"video"} component={EditVideoQuestion}/>
                       </ValueMatches>
                   </div>
                    <div className="question-editor-container">
                        <div className="question-modify-btn"><i className="fa fa-pencil" aria-hidden="true"/></div>
                        <div className="question-delete-btn"><i className="fa fa-times" aria-hidden="true"/></div>
                    </div>
                </div>
    }
}
EditQuestion.propTypes={
    Question:React.PropTypes.object.isRequired,
    onChanged:React.PropTypes.func.isRequired
};

export default EditQuestion
