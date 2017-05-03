import React from 'react';
import Question from 'components/Questions/Question/Question.jsx';


/***************************************************************************/
/* Questions                                                                */
/***************************************************************************/
class Questions extends React.Component{

    constructor(props) {
        super(props);
    }
    /**
     * Returns a view of all questions according to their types.
     * @returns div React.Component
     */
    render() {
        return (
            <div ref="Questions">
                {this.props.questions.map(function(question,index){
                    return (<div className="questions-item" key={question.id}>
                                <div className="question-side-bar">
                                    <img src="/resources/static/img/icons/side-thing.png"/>
                                </div>
                                <div className="question-number">{(index+1)+"."}</div>
                                <div className="question">

                                    <Question Type={question.type} Question={question} Renderer={Question.Renders.Display}/>

                                </div>
                            </div>);
                })}
            </div>
        )
    }
}
export default Questions;