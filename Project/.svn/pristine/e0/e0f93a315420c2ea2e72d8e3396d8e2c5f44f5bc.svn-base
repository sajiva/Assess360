
import React from 'react';
import AnswerChoices from './AnswerChoices.jsx';
import AnswerChoice  from './AnswerChoice/AnswerChoice.jsx';

class EditableAnswerChoices extends React.Component
{
    constructor(props) {
        super(props);
    }

    render()
    {
        return <div className="editable-answer-choices">
                    <AnswerChoices Choices={this.props.Choices} onChanged={this.props.onChanged}>
                       <AnswerChoice CurrentState={'editable'} />
                    </AnswerChoices>
               </div>;
    }
}
EditableAnswerChoices.propTypes={
    Choices:React.PropTypes.array.isRequired,
    onChanged:React.PropTypes.func
};


export default EditableAnswerChoices