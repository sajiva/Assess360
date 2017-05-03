import React from 'react';

class ViewTextQuestion extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="text-question">
                <div className="question-question-content">{this.props.QuestionContent.question}</div>
            </div>);
    }
}
ViewTextQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};

export default ViewTextQuestion