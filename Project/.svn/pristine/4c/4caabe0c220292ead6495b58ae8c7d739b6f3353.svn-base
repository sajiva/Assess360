import React from 'react';

class AnswerChoicesWithAddBtn extends React.Component
{
    constructor(props) {
        super(props);
    }

    render()
    {
        let element=React.Children.only(this.props.children);
        return (<div className="multiple-choice-choices-container">
            {this.props.Choices.map(function(choice,index){
                return React.cloneElement(element,{Value:choice,Index:index,key:index});
            })}
            <span className="multiple-choice-add-choice-container" onClick={this.props.onAddAnswer}>
                <span className="multiple-choice-add-choice-btn ">
                    Add Answer
                </span>
            </span>
        </div>);
    }
}
AnswerChoicesWithAddBtn.propTypes={
    Choices:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    children:React.PropTypes.element.isRequired,
    onAddAnswer:React.PropTypes.func
};

export default AnswerChoicesWithAddBtn