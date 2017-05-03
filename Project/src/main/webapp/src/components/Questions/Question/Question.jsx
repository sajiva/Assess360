import React from "react";
import $ from "jquery";

/***************************************************************************/
/* Imports                                                                 */
/***************************************************************************/
import ValueMatches from 'components/Questions/Question/_Components/ValueMatcher/ValueMatches.jsx';
import ValueMatcher from 'components/Questions/Question/_Components/ValueMatcher/ValueMatcher.jsx';
import EditQuestion from 'components/Questions/Question/Edit/EditQuestion.jsx';
import ViewQuestion from 'components/Questions/Question/View/ViewQuestion.jsx';
import RunQuestion from 'components/Questions/Question/Run/RunQuestion.jsx';


/***************************************************************************/
/* Question                                                                */
/***************************************************************************/
export class Question extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            HasError:false,
            Error:"",
            Question:this.props.Question
        };

        /*******************************************************************/
        /* Fix the Data                                                    */
        /*******************************************************************/
        this.state.Question.type=this.props.Type;
        if(typeof this.state.Question.content == 'string')
        {
            try
            {
                this.state.Question.content = JSON.parse(this.state.Question.content);
            }
            catch(e)
            {
                this.state.HasError=true;
                this.state.Error="Question Data Seems to be un-readable(Corrupted)";
                return;
            }
        }

        /*******************************************************************/
        this.containsError=this.containsError.bind(this);
        this.updateQuestionContent=this.updateQuestionContent.bind(this);
        this.updateQuestion=this.updateQuestion.bind(this)
    }
    containsError(errorMessage){
        this.setState(
        {
            HasError:true,
            Error:errorMessage
        });
    }
    updateQuestionContent(data){
        this.updateQuestion({content:data});
    }
    updateQuestion(data){
        this.setState(
        {
            Question:$.extend(true,this.state.Question,data)
        },function()
        {
            this.props.onChanged(this.state.Question)
        }.bind(this));
    }
    componentWillMount()
    {
        this.updateWithIncomingQuestion(this.props.Question?this.props.Question:{});
    }
    componentWillReceiveProps(props)
    {
        this.updateWithIncomingQuestion(props.Question?props.Question:{});
    }
    updateWithIncomingQuestion(question)
    {
        /*******************************************************************/
        /* Automatically Inject Correct Type                               */
        /*******************************************************************/
        let changed=question.type!=this.props.Type;
        question.type=this.props.Type;

        /*******************************************************************/
        /* Fix Json vs Object for the content                              */
        /*******************************************************************/
        if(typeof question.content == 'string')
        {
            try
            {
                question.content = JSON.parse(question.content);
                changed=true;
            }
            catch(e)
            {
                this.containsError("Question Data Seems to be un-readable(Corrupted)");
                return;
            }
        }

        /*******************************************************************/
        /* Update the Questions                                            */
        /*******************************************************************/
        if(changed){
            this.updateQuestion(question);
        }
    }

    render()
    {
        return (<div className="question-container">
                    <ValueMatches __Value={this.props.Renderer} {...this.props}>
                        <ValueMatcher match={Question.Renders.Edit} component={EditQuestion}/>
                        <ValueMatcher match={Question.Renders.Display} component={ViewQuestion}/>
                        <ValueMatcher match={Question.Renders.Run} component={RunQuestion}/>
                    </ValueMatches>
                </div>);
    }

}
Question.Renders={
    Display:"view",
    Run:"run",
    Edit:"edit"
};

Question.propTypes={
    onChanged:React.PropTypes.func,
    onError:React.PropTypes.func,
    Type:React.PropTypes.string.isRequired,
    Renderer:React.PropTypes.string,
    Question:React.PropTypes.object,
};
Question.defaultProps={
    onError:function(){},
    onChanged:function(){}
};

export default Question;





