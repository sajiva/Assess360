import React from 'react';
import QuestionTypeSelection from 'components/Assessment/Pages/NewQuestion/Components/QuestionTypesSelection/QuestionTypeSelection.jsx';

class QuestionTypesSelection extends React.Component {
    constructor(props){
        super(props);
        this.state={Selected:this.props.Selected}; //Make it undefined by choice

        this.SelectNewChoice=function(choice){
            this.setState({
                Selected:choice
            },function(){
                this.props.onSelectionChanged(choice)
            }.bind(this));
        }.bind(this);
    }
    render()
    {
        return (<div className="add-a-question-types-selection">
            <div className={(typeof this.state.Selected!="undefined"?"selection-exists":"")+" question-type-selection"}>
                <QuestionTypeSelection Id="multiple-choice"
                                       onSelected={this.SelectNewChoice}
                                       IconClass="glyphicon-star-empty"
                                       Name="Multiple Choice"
                                       isSelected={this.state.Selected}/>
                <QuestionTypeSelection Id="text"
                                       onSelected={this.SelectNewChoice}
                                       IconClass="glyphicon-font"
                                       Name="Text response"
                                       isSelected={this.state.Selected}/>
                <QuestionTypeSelection Id="video"
                                       onSelected={this.SelectNewChoice}
                                       IconClass="glyphicon-facetime-video"
                                       Name="Video response"
                                       isSelected={this.state.Selected}/>
                <QuestionTypeSelection Id="audio"
                                       onSelected={this.SelectNewChoice}
                                       IconClass="glyphicon-volume-up"
                                       Name="Audio response"
                                       isSelected={this.state.Selected}/>
                <QuestionTypeSelection Id="code"
                                       onSelected={this.SelectNewChoice}
                                       IconClass="glyphicon-console"
                                       Name="Code response"
                                       isSelected={this.state.Selected}/>
            </div>
        </div>);
    }
}
QuestionTypesSelection.propTypes={
    onSelectionChanged:React.PropTypes.func,
    Selected:React.PropTypes.string,
};
QuestionTypesSelection.defaultProps={
    Selected:"multiple-choice"
};

export default QuestionTypesSelection