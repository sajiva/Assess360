import React from 'react';
import $ from 'jquery';

class DetailsVideoQuestion extends React.Component {

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


    }



    render() {

        return null;
    }

}
DetailsVideoQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};

export default DetailsVideoQuestion