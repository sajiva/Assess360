import React from 'react';
import LetterIndex from 'components/Questions/Question/_Components/MultipleChoiceTools/AnswerChoice/Widgets/LetterIndex.jsx';

class MultipleChoiceQuestionPreview extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            answer: ''
        };

        this.onAnswerSelected = this.onAnswerSelected.bind(this);
    }

    onAnswerSelected(event) {
        this.setState({answer: event.target.value});
    }

    render() {

        const answerChoices = (typeof this.props.content.choices != "undefined" ) ?
            this.props.content.choices.map(function (answerChoice, index) {
                return (
                    <AnswerOption choice={answerChoice} answerID={index} key={index} id={this.props.id + index} name={this.props.id}
                                  checked={this.state.answer === answerChoice.text}
                                  handleChange={this.onAnswerSelected}/>
                )
            }, this) : [];

        return (
            <div className="col-lg-12">
                <h2>{this.props.id}. {this.props.content.question}</h2>
                <div className="multiple-choice-choices-container">
                    {answerChoices}
                </div>
            </div>

        )
    }
}

const AnswerOption=(props)=> {

    return (
        <div className="answer-choice-main-container">
            <input
                type="radio"
                className="radio-button"
                name={props.name}
                checked={props.checked}
                id={props.id}
                value={props.choice.text}
                onChange={props.handleChange}
            />

            <label className="multiple-choice-answer-choice"><LetterIndex Index={props.answerID}/> {props.choice}</label>
        </div>
    );
}

export default MultipleChoiceQuestionPreview;