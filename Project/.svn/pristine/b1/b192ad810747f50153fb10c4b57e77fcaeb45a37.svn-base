import React from 'react';

class AnswerChoices extends React.Component
{
    constructor(props) {
        super(props);
        this.onChanged=this.onChanged.bind(this);
    }
    onChanged(answer, index){
        let choices=this.props.Choices;
        choices[index]=answer;
        this.props.onChanged(choices);
    }
    render()
    {
        let element=React.Children.only(this.props.children);
        return (<div className="multiple-choice-choices-container">
            {this.props.Choices.map(function(choice,index){
                return React.cloneElement(element,{Value:choice,Index:index,key:index,onChanged:this.onChanged});
            }.bind(this))}
        </div>);
    }
}
AnswerChoices.propTypes={
    Choices:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    children:React.PropTypes.element.isRequired,
    onChanged:React.PropTypes.func
};
AnswerChoices.defaultProps={
    onChanged:function(){}
};
export default AnswerChoices;