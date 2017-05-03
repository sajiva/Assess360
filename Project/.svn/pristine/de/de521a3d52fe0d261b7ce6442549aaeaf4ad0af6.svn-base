import React from 'react';
import $ from 'jquery';

/***************************************************************************/
/* Question(Audio Question)                                               */
/***************************************************************************/
export class EditAudioQuestion extends React.Component {

    constructor(props)
    {
        super(props);
        this.state={
            QuestionContent:this.props.QuestionContent?
                this.props.QuestionContent:{
                    question:"No Question Was Found"
                }
        };

        this.saveQuestion=function(e){
            this.setState({
                QuestionContent:$.extend(this.state.QuestionContent,{question:e.target.value})
            },function(){
                this.props.onChanged(this.state.QuestionContent);
            }.bind(this));
        }.bind(this);

    }
    componentWillReceiveProps(props){
        this.setState({ QuestionContent:props.QuestionContent?props.QuestionContent:{
                question:"No Question Was Found"
            } });
    }
    render()
    {
        return (<form>
            <div className="form-group">
                <input value={this.state.QuestionContent.question || ""} onChange={this.saveQuestion} type="text" className="form-control question" id=""/>
            </div>
        </form>);
    }
}
EditAudioQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};
EditAudioQuestion.defaultProps={
    onCreatedNewQuestion:function () {},
    QuestionContent:{
        question:"No Question Was Found"
    }
};


export default EditAudioQuestion