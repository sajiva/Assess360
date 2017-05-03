import React from 'react';

class QuestionTypeSelection extends React.Component{

    //Handles selection of question type

    constructor(props){
        super(props);
    }
    render()
    {
        return (<div onClick={function(e){ this.props.onSelected(this.props.Id)}.bind(this)} className={"btn question-type-selection-option multiple-choice-selection  " + (this.props.isSelected == this.props.Id ? 'selected' : '')}>
                    <div className="question-type-selection-option-icon">
                        <img style={{height: "1.5em"}} src={"/resources/static/img/icons/"+this.props.Id+"-large.png"}/></div>
                    <div className="question-type-selection-option-text">{this.props.Name}</div>
                </div>);
    }
};
QuestionTypeSelection.propTypes={
    Id:React.PropTypes.string.isRequired,
    onSelected:React.PropTypes.func.isRequired,
    IconClass:React.PropTypes.string.isRequired,
    Name:React.PropTypes.string.isRequired,
    isSelected:React.PropTypes.string.isRequired
};

export default QuestionTypeSelection