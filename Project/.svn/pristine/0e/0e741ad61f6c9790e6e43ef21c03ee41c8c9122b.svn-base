import React from 'react';
import TargetGroupAPI from '../../libaries/APIs/TargetGroupAPI.jsx';
import ImportParticipants from './ImportParticipants.jsx';
import PageContent from 'components/Template/PageContent.jsx';
import ImportEmails from './ImportEmails.jsx';
import TargetGroupAssessments from './TargetGroupAssessments.jsx';
import SendAssessment from './SendAssessment.jsx';

class TargetGroup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            group: {
                name: "Loading...",
                participantSet: []
            },
            assessments:[],
            addFromFile: false,
            addFromText: false,
            sendAssessment: false
        };

        TargetGroupAPI.instance.hook()
            .on("get-targetgroup", function (data) {
                this.setState({
                    group: data.data.targetGroupData
                });
            }.bind(this))
            .on("get-targetgroup-assessments", function (data) {
                this.setState({
                    assessments: data.data
                });
            }.bind(this));

        this.showFilePopup = this.showFilePopup.bind(this);
        this.showTextPopup = this.showTextPopup.bind(this);
        this.showSendAssessmentPopup = this.showSendAssessmentPopup.bind(this);
        this.onAssessmentSent=this.onAssessmentSent.bind(this);
    }

    componentDidMount() {
        TargetGroupAPI.instance.initiate("get-targetgroup", {id: this.props.params.targetGroup});
        TargetGroupAPI.instance.initiate("get-targetgroup-assessments", {id: this.props.params.targetGroup});
    }

    showFilePopup() {
        this.setState({
            addFromFile: !this.state.addFromFile
        });
    }

    showTextPopup() {
        this.setState({
            addFromText: !this.state.addFromText
        });
    }

    showSendAssessmentPopup() {
        this.setState({
            sendAssessment: !this.state.sendAssessment
        });
    }
    onAssessmentSent(){
        this.setState({
            sendAssessment:false
        });
    }
    render() {
        const $participants = this.state.group.participantSet.map(function (item, index) {
            return (<tr className="participant" key={index}>
                <td className="name">{item.name}</td>
                <td className="email">{item.email}</td>
                <td className="phone">{item.phone}</td>
            </tr>);
        });

        return (<PageContent PageTitle={this.state.group.name}>
            <div className="main-container">
                <div className="main-content">
                    <div>
                        <div className="pull-left">
                            <button className="btn my-button-class" onClick={this.showFilePopup}><i
                                className="glyphicon glyphicon-plus"/> Add Participants From File
                            </button>
                            <button className="btn my-button-class" onClick={this.showTextPopup}><i
                                className="glyphicon glyphicon-plus"/> Add Participants From Text
                            </button>
                        </div>
                        <div className="pull-right">
                            <button className="btn my-button-class" onClick={this.showSendAssessmentPopup}>Send Assessment</button>
                        </div>
                    </div>

                    <ImportParticipants id={this.props.params.targetGroup} showPopup={this.state.addFromFile}
                                        closePopup={this.showFilePopup}/>
                    <ImportEmails showPopup={this.state.addFromText} id={this.props.params.targetGroup}
                                  closePopup={this.showTextPopup}/>
                    <SendAssessment participants={this.state.group.participantSet} assessments={this.state.assessments} showPopup={this.state.sendAssessment} closePopup={this.showSendAssessmentPopup} onAssessmentSent={this.onAssessmentSent}/>

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {$participants}
                        </tbody>
                    </table>

                    <TargetGroupAssessments assessments={this.state.assessments}/>
                </div>
            </div>
        </PageContent>)
    }

}

export default TargetGroup