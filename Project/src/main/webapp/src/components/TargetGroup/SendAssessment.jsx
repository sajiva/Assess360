import React from 'react';
import {Modal} from 'react-bootstrap';
import Participants from './Participants.jsx';
import AssessmentsDropDown from './AssessmentsDropDown.jsx';
import AssessmentAPI from '../../libaries/APIs/AssessmentAPI.jsx';
class SendAssessment extends React.Component {


    static propTypes={
        showPopup:React.PropTypes.bool,
        assessments:React.PropTypes.object,
        participants:React.PropTypes.array,
        closePopup:React.PropTypes.func,
        onAssessmentSent:React.PropTypes.func
    };
    static defaultProps={
        closePopup:function(){
        },
        onAssessmentSent:function(){
        }


    };
    constructor(props) {
        super(props);

        this.state = {
            assessment: false,
            selectedParticipants: [],
            IsSending:false
        };

        this.handleChange = this.handleChange.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.sendAssessment = this.sendAssessment.bind(this);
    }

    handleChange(assessment) {
        this.setState({assessment: assessment});
    }

    toggleSelection(participant) {
        let participants = this.state.selectedParticipants;

        if (this.isSelected(participant)) {
            let i = participants.indexOf(participant);
            if (i > -1) {
                participants.splice(i, 1);
            }
        } else {
            participants.push(participant);
        }

        this.setState({
            selectedParticipants: participants
        });
    }

    isSelected(participant) {
        return this.state.selectedParticipants.includes(participant)

    }

    sendAssessment() {
        if(!this.state.assessment){
            return;
        }
        this.setState({
            IsSending:true
        },()=>
        {
            AssessmentAPI.instance.initiate("send-assessment",{
                Participants:this.state.selectedParticipants,
                assessmentID:this.state.assessment.id
            },()=>
            {
                this.setState({
                    IsSending:false
                },()=>
                {
                    this.props.onAssessmentSent();
                })

            });
        });

    }

    render() {
        return (
            <Modal
                show={this.props.showPopup}
                container={this}
                aria-labelledby="sendAssessment">
                <Modal.Header>
                    <Modal.Title id="sendAssessment" className="textbox-label">Select Participants to send assessment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AssessmentsDropDown assessments={this.props.assessments} handleChange={this.handleChange}/>
                    <Participants participants={this.props.participants} toggleSelection={this.toggleSelection} isSelected={this.isSelected}/>
                </Modal.Body>
                <Modal.Footer>
                    <div className="pull-left">
                    <div className={"btn my-button-class "+(this.state.assessment?"":"disabled")} onClick={this.sendAssessment}>
                        {this.state.IsSending?<span className="loading-spinner"/>:"Send Assessment"}
                    </div>
                    </div>
                    <div className="btn my-button-class" onClick={this.props.closePopup}>Close</div>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default SendAssessment;