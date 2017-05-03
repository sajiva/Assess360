import React from 'react';

class ViewCodeQuestion extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className="code-question" >
                <div className="question-question-content">{this.props.QuestionContent.question}</div>
            </div>);
    }
}

ViewCodeQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};
export default ViewCodeQuestion