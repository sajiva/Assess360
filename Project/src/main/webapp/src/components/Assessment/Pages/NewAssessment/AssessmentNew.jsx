import React from "react";
import $ from 'jquery';
import AssessmentAPI from "libaries/APIs/AssessmentAPI.jsx";
import Loader from "../../../Containers/Loader.jsx";
import PageContent from 'components/Template/PageContent.jsx';
import AssessmentCreator from 'components/Assessment/Tools/AssessmentController/Tools/AssessmentCreator.jsx';
import TargetGroupDropDown from 'components/TargetGroup/TargetGroupDropDown.jsx';
import {browserHistory} from 'react-router';

/**
 * @class AssessmentNew
 * @extends React.Component
 * @description The component in which creates an initial assessment for the creation of assessments
 */
class AssessmentNew extends React.Component{

    /**
     * @constructor
     * @param props
     */
    constructor(props){
        super(props);

        this.state={
            targetGroup: ''
        };

        /*******************************************************************/
        this.CreatedFinished=this.CreatedFinished.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * Create The Assessment and Redirects to the Assessment Home
     * @param assessmentID
     * @constructor
     */
    CreatedFinished(assessmentID){
        if (this.state.targetGroup != 0) {
            AssessmentAPI.instance.initiate("add-target-group-to-assessment", {
                assessmentID: assessmentID,
                targetGroupId: this.state.targetGroup
            });
        }
        browserHistory.push("/app/assessments/"+assessmentID);
    }
    handleChange(event) {
        this.setState({targetGroup: event.target.value});
    }


    /**
     * @function The render method to the NewAssessment component
     * @description The inital state is false at first enabling the user to enter the name of the assessment. Once the
     * user hits the submit button, the assessment will go into a state in which creates a POST request.
     * @returns {XML}
     */
    render()
    {
        return ( <PageContent PageTitle="New Assessment" SidePanel={null}>
                    <AssessmentCreator Assessment={{}} onAssessmentCreated={this.CreatedFinished}  >
                        {function(assessmentData,updateLocalCopy,initiateCreation,overwriteData,isCreating){
                            return (<div className="new-assessment-name-container">
                                        <h2 className="new-assessment-name-title">New Assessment</h2>
                                        <input ref="assessmentNameInput"  onChange={(e) => updateLocalCopy({name: e.target.value})} type="text" className="new-assessment-name-input form-control assessment-create-set-name-input" placeholder="Enter the Name" required="true"/>
                                        <input ref="assessmentSubtitleInput"  onChange={(e) => updateLocalCopy({subtitle: e.target.value})} type="text" className="new-assessment-name-input form-control assessment-create-set-name-input" placeholder="Subtitle (optional)" />
                                        <TargetGroupDropDown handleChange={this.handleChange}/>
                                        {isCreating?<Loader/>:<input className="new-assessment-name-btn" type="submit" onClick={initiateCreation}/>}
                                    </div>);
                        }.bind(this)}

                    </AssessmentCreator>
            </PageContent>

        );
    }
}
export default AssessmentNew;