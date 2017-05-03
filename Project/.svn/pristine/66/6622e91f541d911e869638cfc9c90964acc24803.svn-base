import React from 'react';
import $ from 'jquery';

class DetailsTextQuestion extends React.Component {
    constructor(props)
    {
        super(props);
        this.state={
            QuestionContent:this.props.QuestionContent?this.props.QuestionContent:{
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
        return null;
    }

}
DetailsTextQuestion.propTypes={
    QuestionContent:React.PropTypes.object
};
export default DetailsTextQuestion