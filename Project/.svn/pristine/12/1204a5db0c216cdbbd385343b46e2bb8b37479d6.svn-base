import React from 'react';
import QuestionTypesSelection from 'components/Assessment/Pages/NewQuestion/Components/QuestionTypesSelection/QuestionTypesSelection.jsx';
import Question from 'components/Questions/Question/Question.jsx';

class QuestionCreatorModule extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Question:{},
            QuestionType:"multiple-choice"
        };

        this.onQuestionTypeChanged=function(type){
            this.setState({
                QuestionType:type
            },function(){
                this.props.onQuestionTypeChanged(type);
            }.bind(this));

        }.bind(this);

        this.onQuestionChanged=function(data){
            this.setState({
                Question:data
            },function(){
                this.props.onQuestionChanged(data);
            }.bind(this));
        }.bind(this)
    }
    componentWillReceiveProps(props){

    }
    render()
    {
        //Renders module for Question Creator

        return (<div className="add-a-question-main-container">
                    <QuestionTypesSelection onSelectionChanged={this.onQuestionTypeChanged}/>
                    <Question Type={this.state.QuestionType} Renderer={Question.Renders.Edit} onChanged={this.onQuestionChanged} Question={this.state.Question}/>
                </div>);

    }

}
QuestionCreatorModule.propTypes={
    onQuestionChanged:React.PropTypes.func,
    onQuestionTypeChanged:React.PropTypes.func
};
QuestionCreatorModule.defaultProps={
    onQuestionTypeChanged:function(){},
    onQuestionChanged:function(){}
};

export default QuestionCreatorModule

