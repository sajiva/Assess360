import React from 'react';


import AssessmentController from 'components/Assessment/Tools/AssessmentController/AssessmentController.jsx';
import AssessmentsFooter from 'components/Assessment/Components/AssessmentFooter/AssessmentFooter.jsx';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
import PageContent from 'components/Template/PageContent.jsx';

class Assessment extends React.Component{
    constructor(props){
        super(props);
        this.state={
            PageTitle:"Build your Assessment",
            AssessmentID:parseInt(this.props.params.assessmentID),
            isSaving:false,
            Load:true
        };

        this.setSaving=function(){
            this.setState({isSaving:false})
        }.bind(this);
        this.setNotSaving=function(){
            this.setState({isSaving:false})
        }.bind(this);
        this.finishedLoading=function(){
            this.setState({Load:false});
        }.bind(this);

    }
    componentWillReceiveProps(props){
        this.setState({
            AssessmentID:parseInt(this.props.params.assessmentID),
        });
    }
    componentWillMount(){
        this.Navigation=new NavigationInfo(this.context.router,function () {
            this.forceUpdate(); //TODO I dont like this, need to refactor the navigation technique
        }.bind(this));

        this.Navigation.EnableLeftButton("Back", "/app/home");
        this.Navigation.EnableRightButton("Questions", "/app/assessments/"+this.state.AssessmentID+"/home");
    }
    getChildContext(){
        return {
            Load:function(){
                this.setState({
                    Load:false
                });
            }.bind(this),
            NavigationInfo:this.Navigation,
            isSaving:this.state.isSaving,
            AssessmentID:this.state.AssessmentID,
            PageTitle:this.state.PageTitle,
            setPageTitle:function(title){
                this.setState({PageTitle:this.state.PageTitle})
            }.bind(this)
        };
    }
    render(){
        return (<div className="new-assessment-main-container">
            <div className="new-assessment-container">
                <AssessmentController onUpdated={this.finishedLoading} onSaveStarted={this.setSaving} onSaved={this.setNotSaving} Load={this.state.Load} AssessmentID={this.state.AssessmentID} >
                    {function(assessment,refresh,saveChanges,isLoading,isSaving){

                        debug("AssessmentController: ",assessment);
                        return (
                            <div>
                                <div className="build-your-assessment-container">

                                    {React.Children.map(this.props.children, child => {
                                        return React.cloneElement(child, {
                                            Assessment: assessment,
                                            onRefresh: refresh,
                                            onSaveChanges: saveChanges,
                                            isLoading: isLoading,
                                            isSaving: isSaving
                                        })
                                    })}
                                </div>
                            </div>);
                    }.bind(this)}
                </AssessmentController>
            </div>
            <AssessmentsFooter/>
        </div>);
    }
}
Assessment.contextTypes={
    router:React.PropTypes.object
};
Assessment.childContextTypes={
    Load:React.PropTypes.func,
    NavigationInfo:React.PropTypes.instanceOf(NavigationInfo),
    AssessmentID:React.PropTypes.number,
    PageTitle:React.PropTypes.string,
    setPageTitle:React.PropTypes.func,
    isSaving:React.PropTypes.bool
};


export default Assessment