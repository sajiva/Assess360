import React from 'react';
import APIComponent from "components/Containers/APIComponent.jsx";
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
import QuestionCreatorModule from 'components/Assessment/Pages/NewQuestion/Components/QuestionCreatorModule.jsx';
import AssessmentAPI from "libaries/APIs/AssessmentAPI.jsx";
import PageContent from 'components/Template/PageContent.jsx';
class NewQuestion extends React.Component{
    constructor(props){
        super(props);
        this.state={
            Save:false
        };

        /*******************************************************************/
        this.startAdding=function(){
            this.setState({
                Save:true
            });
        }.bind(this);

        this.startedAdding=function(){
            this.setState({
                Save:false
            },function(){
                this.context.NavigationInfo.LeftButton.Enabled=false;
                this.context.NavigationInfo.DisableRightButton("Adding...");
            }.bind(this));
        }.bind(this);

        /*******************************************************************/
        this.finishAdding=function(){
            this.context.router.push("/app/assessments/"+this.props.Assessment["id"]+"/home");
        }.bind(this);
    }
    componentWillMount(){

        /*******************************************************************/
        this.context.NavigationInfo.EnableRightButton("Add", function(){
            this.startAdding();
        }.bind(this));

        /*******************************************************************/
        this.context.NavigationInfo.EnableLeftButton("Questions", "/app/assessments/"+this.props.Assessment.id+"/add-question");
    }
    render()
    {
        return (
            <PageContent PageTitle="New Question">
                <APIComponent Fetch={this.state.Save} APIListener={AssessmentAPI.instance} Event="add-question-to-assessment" onSubmit={this.finishAdding} initialInput={{assessmentID:this.props.Assessment["id"]}}>
                    {function(data, change, send, setData, isLoading ){
                        return <QuestionCreatorModule onQuestionChanged={change}/>
                    }}
                </APIComponent>
            </PageContent>);
    }
}
NewQuestion.contextTypes={
    router: React.PropTypes.object.isRequired,
    Assessment:React.PropTypes.object,
    NavigationInfo:React.PropTypes.instanceOf(NavigationInfo)
};

export default NewQuestion;