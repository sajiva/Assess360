import React from 'react';
import $ from 'jquery';
import ValueMatches from 'components/Questions/Question/_Components/ValueMatcher/ValueMatches.jsx';
import ValueMatcher from 'components/Questions/Question/_Components/ValueMatcher/ValueMatcher.jsx';
import DetailsAudioQuestion from 'components/Questions/Question/Edit/Details/DetailsAudioQuestion.jsx';
import DetailsCodeQuestion from 'components/Questions/Question/Edit/Details/DetailsCodeQuestion.jsx';
import DetailsMultipleChoiceQuestion from 'components/Questions/Question/Edit/Details/DetailsMultipleChoiceQuestion.jsx';
import DetailsTextQuestion from 'components/Questions/Question/Edit/Details/DetailsTextQuestion.jsx';
import DetailsVideoQuestion from 'components/Questions/Question/Edit/Details/DetailsVideoQuestion.jsx';
import HintsDropdown from 'components/Questions/Question/_Components/Hint/HintDropdown.jsx';
import {Form} from 'react-bootstrap';
class BasicDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            HasError:false,
            Error:"",
            Question:this.props.Question
        };

        this.updateQuestion=this.updateQuestion.bind(this);
        this.updateQuestionContent=this.updateQuestionContent.bind(this);
    }
    componentWillReceiveProps(props){
        this.setState({ Question:props.Question });
    }
    updateQuestion(data)
    {
        debug("EditQuestion -> Update Question Data",data);

        let newQuestionData=$.extend(this.state.Question,data);

        /*******************************************************************/
        this.setState( { Question:newQuestionData },()=>
        {
            this.props.onChanged(this.state.Question)
        });


    }
    updateQuestionContent(data){
        this.updateQuestion({content:data});
    }

    render(){
        return (<div className="edit-question-details">
                    <Form inline>
                        <HintsDropdown onHintChanged={this.updateQuestion}/>
                        <ValueMatches __Value={this.props.Type} QuestionContent={this.state.Question.content || {}} onChanged={this.updateQuestionContent}>
                            <ValueMatcher match={"audio"} component={DetailsAudioQuestion}/>
                            <ValueMatcher match={"code"} component={DetailsCodeQuestion}/>
                            <ValueMatcher match={"multiple-choice"} component={DetailsMultipleChoiceQuestion}/>
                            <ValueMatcher match={"text"} component={DetailsTextQuestion}/>
                            <ValueMatcher match={"video"} component={DetailsVideoQuestion}/>
                        </ValueMatches>
                    </Form>
                </div>);
    }
}

    BasicDetails.propTypes={
    Question:React.PropTypes.object.isRequired,
    onChanged:React.PropTypes.func.isRequired
};

export default BasicDetails