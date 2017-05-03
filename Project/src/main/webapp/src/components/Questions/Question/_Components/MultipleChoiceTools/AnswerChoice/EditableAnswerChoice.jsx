import React from 'react';
import LetterIndex from  './Widgets/LetterIndex.jsx';
class EditableAnswerChoice extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (<div className="answer-choice-main-container">
            <div className="multiple-choice-answer-choice-editable-mode-container">
                <div className='multiple-choice-answer-choice-details-container'>
                            <span onClick={()=>{this.props.onStateChange('editing')}}
                                  className="answer-choice answer-choice-editable"><LetterIndex Index={this.props.Index}/><span
                                className="choice-text">{this.props.Value}</span></span>
                </div>
                <div className="choice-delete-btn-container">
                                            <span className="choice-delete-btn-holder">
                                                <span onClick={(event) => this.props.onAnswerDelete(this.props.Index)}
                                                      className="choice-delete-btn">Delete</span>
                                            </span>
                </div>
            </div>
        </div>);
    }
}

export default EditableAnswerChoice