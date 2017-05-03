import React from 'react';
import $ from 'jquery';

class EditVideoQuestion extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            showVideo:false,
            QuestionContent:this.props.QuestionContent?this.props.QuestionContent:{
                    question:"Instructions for video question"
                }
        };

        this.saveQuestion=function(e){
            this.setState({
                QuestionContent:$.extend(this.state.QuestionContent,{question:e.target.value})
            },function(){
                this.props.onChanged(this.state.QuestionContent);
            }.bind(this));
        }.bind(this);


        this.addVideo = this.addVideo.bind(this);
    }

    addVideo() {
        this.setState({
            showVideo: !this.state.showVideo,
        });
    }

    render() {

        let caption = this.state.showVideo ? "Hide Video" : "Add Video";
        return (<form>
            <div className="form-group">
                <input value={this.state.QuestionContent.question || ""} onChange={this.saveQuestion} type="text" className="form-control question" />
                <div className="" style={{margin:"5px"}}>
                    <span onClick={this.addVideo} className="btn btn-default">{caption}</span>
                    {this.state.showVideo ? <Video /> : null}
                </div>
            </div>
        </form>);
    }


}
EditVideoQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};

export default EditVideoQuestion