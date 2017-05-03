import React from 'react';
import MultipleChoiceQuestionPreview from './MultipleChoiceQuestionPreview.jsx';
import TextQuestionPreview from './TextQuestionPreview.jsx';
import CodeQuestionPreview from './CodeQuestionPreview.jsx';
import AudioQuestionPreview from './AudioQuestionPreview.jsx';
import VideoQuestionPreview from './VideoQuestionPreview.jsx';

class QuestionPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            HasError:false,
            Error:"",
            question:this.props.question
        };
        /*******************************************************************/
        /* Fix the Data                                                    */
        /*******************************************************************/
        this.state.question.type=this.props.question.type;
        if(typeof this.state.question.content == 'string')
        {
            try
            {
                this.state.question.content = JSON.parse(this.state.question.content);
            }
            catch(e)
            {
                this.state.HasError=true;
                this.state.Error="Question Data Seems to be un-readable(Corrupted)";
                return;
            }
        }

        this.questionTypes=
            {
                'code': (
                    <CodeQuestionPreview content={this.state.question.content} id={this.props.id} key={this.props.id}/>
                ),
                'text': (
                    <TextQuestionPreview content={this.state.question.content} id={this.props.id} key={this.props.id}/>
                ),
                'audio': (
                    <AudioQuestionPreview content={this.state.question.content} id={this.props.id} key={this.props.id}/>
                ),
                'video': (
                    <VideoQuestionPreview content={this.state.question.content} id={this.props.id} key={this.props.id}/>
                ),
                'multiple-choice': (
                    <MultipleChoiceQuestionPreview content={this.state.question.content} id={this.props.id} key={this.props.id}/>
                )
            };

    }

    render() {

        return (
            <div className='col-lg-12' style={{borderRadius:'10px',padding:'10px',margin:'5px',boxShadow:'0px 1px 3px black'}} >
                {this.questionTypes[this.state.question.type]}
            </div>
        )
    }
}

export default QuestionPreview;