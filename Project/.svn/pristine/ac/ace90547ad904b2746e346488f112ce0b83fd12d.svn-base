import React from 'react';
import LetterIndex from  './Widgets/LetterIndex.jsx';
class SimpleAnswerChoice extends React.Component
{
    constructor(props) {
        super(props);

    }

    render()
    {
        return (
            <div className="question-answer-view">
                <LetterIndex Index={this.props.Index}/>
                <span className="choice-text"> {this.props.Value}</span>
            </div>)
    }

}
SimpleAnswerChoice.propTypes={
    Index:React.PropTypes.number,
    Value:React.PropTypes.string
};

export default SimpleAnswerChoice