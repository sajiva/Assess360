import React from 'react';
import APIComponent from "components/Containers/APIComponent.jsx";
import AssessmentAPI from 'libaries/APIs/AssessmentAPI.jsx';

class AssessmentCreator extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            Assessment: this.props.Assessment?this.props.Assessment:false
        };

        this.incomingData=function(data){
            this.setState({
                Assessment:data
            });
        };

    }
    render(){

        return (
            <APIComponent Fetch={false} onSubmit={(data)=>{this.props.onAssessmentCreated(data["id"],data);}} onChange={this.incomingData} onFetching={this.props.onAssessmentCreating} initialInput={this.state.Assessment} initialOutput={this.state.Assessment} APIListener={AssessmentAPI.instance} Event="create-new-assessment">
                {function(result,updateLocalCopy,initiateCreation,overwriteData,isCreating){
                    return (this.props.children(this.state.Assessment,updateLocalCopy,initiateCreation,overwriteData,isCreating));
                }.bind(this)}
            </APIComponent>
        );
    }
}
AssessmentCreator.propTypes={
    children:React.PropTypes.func,
    Assessment:React.PropTypes.object,
    onAssessmentCreated:React.PropTypes.func,
    onAssessmentCreating:React.PropTypes.func
};

AssessmentCreator.defaultProps={
    onAssessmentCreated:function(AssessmentID, AssessmentData){},
    onAssessmentCreating:function(){},
    onCreating:function(){}
};


export default AssessmentCreator
