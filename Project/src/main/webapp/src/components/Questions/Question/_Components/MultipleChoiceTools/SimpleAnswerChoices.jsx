import React from 'react';
import AnswerChoices from './AnswerChoices.jsx';
import SimpleAnswerChoice from './AnswerChoice/SimpleAnswerChoice.jsx';

class SimpleAnswerChoices extends React.Component
{
    constructor(props) {
        super(props);
    }

    render()
    {
        return <AnswerChoices Choices={this.props.Choices}>
                    <SimpleAnswerChoice />
               </AnswerChoices>;
    }
}
SimpleAnswerChoices.propTypes={
    Choices:React.PropTypes.array.isRequired
};


export default SimpleAnswerChoices