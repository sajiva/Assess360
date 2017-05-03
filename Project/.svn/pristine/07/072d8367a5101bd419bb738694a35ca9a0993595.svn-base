import Questions from "../../../Questions/Questions.jsx";
import React from "react";
import $ from "jquery";
import APIComponent from "../../../Containers/APIComponent.jsx"
import PageContent from 'components/Template/PageContent.jsx';
import AssessmentAPI from 'libaries/APIs/AssessmentAPI.jsx';
import AssessmentFetcher from 'components/Assessment/Tools/AssessmentController/Tools/AssessmentFetcher.jsx';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
import SendAssessment from 'components/TargetGroup/SendAssessment.jsx';
import {browserHistory} from 'react-router';
    /**
     * @class AdminReview
     */

const DateComponent = (props)=>
{
    return <div>{(new Date(props.Value)).toDateString()}</div>
};
class AdminReview extends React.Component{

    static contextTypes={
        NavigationInfo:React.PropTypes.instanceOf(NavigationInfo),
        Load:React.PropTypes.func
    };
    state={
        Sending:false
    };
    constructor(props){
        super(props);

        this.sendAssessment=this.sendAssessment.bind(this);
        this.onAssessmentSent=this.onAssessmentSent.bind(this);
        this.CloseSendingDialog=this.CloseSendingDialog.bind(this);
    }
    sendAssessment(){
        this.setState({Sending:true});
    }
    onAssessmentSent(){
        browserHistory.push("/app/home");
    }
    CloseSendingDialog(){
        this.setState({Sending:false});
    }
    componentWillMount(){
        if(this.props.Assessment.targetGroup){
            this.context.NavigationInfo.EnableRightButton("Send",this.sendAssessment);
        }
        else
        {
            this.context.NavigationInfo.EnableRightButton("Make Target Group","app/target-groups");
        }


        this.context.NavigationInfo.EnableLeftButton("Back", "app/assessments/"+this.props.Assessment.id+"/home");

    }
    /**
     * @returns {APIComponent}
     */

    render() {
        return (<PageContent PageTitle="Review Assessment" >
                    <div className="basic-info">
                        <dl>
                            <dt className="allowed_time">Allowed Time</dt>
                            <dd className="allowed_time">{this.props.Assessment.allowed_time_sec}</dd>
                            <dt className="created_At">Created At</dt>
                            <dd className="created_At"><DateComponent Value={this.props.Assessment.createdAt}/></dd>
                            <dt className="expirationDate">Expiration Date</dt>
                            <dd className="expirationDate"><DateComponent Value={this.props.Assessment.expirationDate}/></dd>
                            <dt className="name">Title</dt>
                            <dd className="name">{this.props.Assessment.name}</dd>
                            <dt className="subtitle">Subtitle</dt>
                            <dd className="subtitle">{this.props.Assessment.subtitle}</dd>
                            <dt className="targetGroup">Target Group</dt>
                            <dd className="targetGroup">{this.props.Assessment.targetGroup?this.props.Assessment.targetGroup.name:"NONE"}</dd>
                            <dt className="questions">Questions</dt>
                            <dd className="questions"><Questions  questions={this.props.Assessment["questionSet"]}/></dd>
                        </dl>
                    </div>
                    {this.props.Assessment.targetGroup?<SendAssessment showPopup={this.state.Sending} closePopup={this.CloseSendingDialog} assessments={[this.props.Assessment]} participants={this.props.Assessment.targetGroup.participantSet} onAssessmentSent={this.onAssessmentSent}/>:null}

                </PageContent>
            
        );
    }
}

export default AdminReview