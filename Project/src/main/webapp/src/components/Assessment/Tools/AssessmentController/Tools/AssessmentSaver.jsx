import React from 'react';
import APIComponent from "components/Containers/APIComponent.jsx";
import AssessmentAPI from 'libaries/APIs/AssessmentAPI.jsx';

class AssessmentSaver extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            Saving: this.props.Save,
            Assessment: this.props.Assessment
        };

        this.saveFinished=function(data){
            this.setState({
                Saving:false,
                Assessment:data
            },function(){
                this.props.onSaved(this.state.Assessment);
            }.bind(this));
        }.bind(this);

    }
    componentWillReceiveProps(props){
        this.setState({
            Saving: props.Save,
            Assessment: props.Assessment
        });
    }
    render(){
        return (<div className="assessment-modifier">
            <APIComponent Fetch={this.state.Saving} initialOutput={this.state.Assessment} onSubmit={this.saveFinished} APIListener={AssessmentAPI.instance} Event="save-assessment-assessment" initialInput={$.extend(this.props.Assessment,{assessmentID:this.props.AssessmentID})} >
                {function(assessment,updateData,save,overwriteData,isSaving){
                    return this.props.children(assessment,updateData,save,overwriteData,isSaving); // Repeated the function call for cosmetics... Clearlty see what each arguments means
                }.bind(this)}
            </APIComponent>
        </div>);
    }
}
AssessmentSaver.propTypes={
    children:React.PropTypes.func,
    onSaved:React.PropTypes.func,
    Save:React.PropTypes.bool,
    AssessmentID:React.PropTypes.number.isRequired,
    Assessment:React.PropTypes.object.isRequired,
};
AssessmentSaver.defaultProps={
    onSaved:function(){

    }
};

export default AssessmentSaver