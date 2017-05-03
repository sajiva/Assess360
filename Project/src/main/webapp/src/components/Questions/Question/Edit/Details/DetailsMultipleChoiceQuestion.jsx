import React from 'react';

import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
class DetailsMultipleChoiceQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            NumberOfChoices:this.props.QuestionContent?(
                    this.props.QuestionContent.choices?(
                            this.props.QuestionContent.choices.length // Question Content and Choices were found
                        ):0 // If no choices
                ):0, // If not Question Content

            QuestionContent:this.props.QuestionContent?
                this.props.QuestionContent:{
                    question:"No Question Was Found"
                }
        };
        this.maxChoices=4;
        this.minChoices=1;

        this.numberOfChoicesChanged=this.numberOfChoicesChanged.bind(this);
        this.setNumberOfChoices=this.setNumberOfChoices.bind(this);
        this.saveQuestion=this.saveQuestion.bind(this);
    }
    numberOfChoicesChanged(e){
        let value=e.target.value;
        if(!/^\d+$/.test(value)){
            this.setNumberOfChoices(this.state.minChoices);
            return;
        }

        let numberOfChoices=parseInt(value);
        this.setNumberOfChoices(numberOfChoices);
    }
    setNumberOfChoices(num)
    {
        let newAnswers;
        if(this.state.NumberOfChoices>num){
            newAnswers=[];
            for(let i=0;i<num;i++) {
                newAnswers.push("Answer " + i);
            }
            this.saveQuestion({choices:newAnswers});
            return;
        }
        newAnswers=this.props.QuestionContent.choices || [];
        for(let i=this.state.NumberOfChoices;i<num;i++) {
            newAnswers.push("Answer " + i);
        }
        this.saveQuestion({choices:newAnswers});
    }
    saveQuestion(data){
        this.setState({
            QuestionContent:$.extend(this.state.QuestionContent,data)
        },function()
        {
            this.props.onChanged(this.state.QuestionContent);
        }.bind(this));
    }
    componentWillMount(props){
        this.setState({
            NumberOfChoices: this.props.QuestionContent ? (
                    this.props.QuestionContent.choices ? (
                            this.props.QuestionContent.choices.length // Question Content and Choices were found
                        ) : 0 // If no choices
                ) : 0, // If not Question Content
        });

    }
    componentWillReceiveProps(props){
        this.setState({
            NumberOfChoices: props.QuestionContent ? (
                    props.QuestionContent.choices ? (
                            props.QuestionContent.choices.length // Question Content and Choices were found
                        ) : 0 // If no choices
                ) : 0, // If not Question Content
        });
    }

    render(){

        let answerChoices=[];
        for(let choiceNum=this.minChoices;choiceNum<=this.maxChoices;choiceNum++){
            answerChoices.push(<option key={choiceNum} value={choiceNum}>{choiceNum}</option>);
        }

        return <FormGroup controlId="formInlineName">
            <ControlLabel>Answers</ControlLabel>
            <select className="form-control" value={this.state.NumberOfChoices} onChange={this.numberOfChoicesChanged}>
                {answerChoices}
            </select >
        </FormGroup>
    }

}
DetailsMultipleChoiceQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};

export default DetailsMultipleChoiceQuestion