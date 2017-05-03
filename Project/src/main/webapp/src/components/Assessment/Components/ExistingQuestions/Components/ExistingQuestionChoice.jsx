import React from "react";
import $ from "jquery";

/**
 * @class ExistingQuestionChoice
 * @description Renders a single answer choice if the question is a multiple choice question
 */
class ExistingQuestionChoice extends React.Component{


    constructor(props){
        super(props);

        this.state = {
            text: this.props.text,
            letter: this.props.letter
        }


    }
    render(){
        const choiceText = "Hello world";
        return (
            <span style={{borderRadius:'5px',padding:'10px',margin:'10px 20px 0px 0px',boxShadow:'0px 1px 3px black'}}>
                <b>{this.state.letter}:</b>
                &nbsp;
                <span className="choice-text">{this.state.text}</span>
            </span>
        );
    }
}

export default ExistingQuestionChoice;