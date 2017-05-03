import React from 'react';
import $ from 'jquery';
import EditableAnswerChoices from 'components/Questions/Question/_Components/MultipleChoiceTools/EditableAnswerChoices.jsx';


class EditMultipleChoiceQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            QuestionContent:this.props.QuestionContent?
                this.props.QuestionContent:{
                    question:"No Question Was Found"
                }
        };

        this.saveChoices=function(choices){
            this.setState({
                QuestionContent:$.extend(this.state.QuestionContent,{choices:choices})
            },function(){
                this.props.onChanged(this.state.QuestionContent);
            }.bind(this));


        }.bind(this);
        this.saveQuestion=function(e){
            this.setState({
                QuestionContent:$.extend(this.state.QuestionContent,{question:e.target.value})
            },function(){
                this.props.onChanged(this.state.QuestionContent);
            }.bind(this));
        }.bind(this);
    }
    componentWillReceiveProps(props){
        this.setState({ QuestionContent:props.QuestionContent?props.QuestionContent:{
                question:"No Question Was Found"
            } });
    }
    render(){
        return <div>
            <input value={this.state.QuestionContent.question || ""} onChange={this.saveQuestion} type="text" className="form-control question" />
            <EditableAnswerChoices onChanged={this.saveChoices} Choices={this.props.QuestionContent.choices || []}/>
        </div>;
    }
}
EditMultipleChoiceQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};

export default EditMultipleChoiceQuestion