import React from 'react';
import ParticipantTable from './ParticipantTable.jsx';
import ValueMatcher from 'components/Questions/Question/_Components/ValueMatcher/ValueMatches.jsx';
import ValueMatches from 'components/Questions/Question/_Components/ValueMatcher/ValueMatches.jsx';
import ImportEmails from 'components/TargetGroup/ImportEmails.jsx';
import ImportParticipants from './ImportParticipants.jsx';
import {Link} from 'react-router';
class TargetGroupsTable extends React.Component{
    static propTypes={
        TargetGroups:React.PropTypes.array.isRequired
    };

    constructor(props){
        super(props);
        this.state={
            importMethod:"none"
        };

        this.importSelection={
            "text":<ImportEmails/>
        };
        this.changeImportMethod=this.changeImportMethod.bind(this);
        this.importFromFile=this.importFromFile.bind(this);
        this.importFromText=this.importFromText.bind(this);
    }
    changeImportMethod(method){
        this.setState({
            importMethod:method || "none"
        });
    }
    importFromFile(){
        this.changeImportMethod("file");
    }
    importFromText(){
        this.changeImportMethod("text");
    }
    render(){
        const ImportEmailsSelection = (props) => {
            return <div className="import-emails-selection">

                <Link to={"/app/target-group/"+props.TargetGroup.id} className="from-file text" onClick={this.importFromFile}>From File</Link>
                <div className="from-file btn btn-default" onClick={this.importFromText}>From Text</div>
            </div>
        };

        return this.props.TargetGroups.length==0?<div className="no-target-groups"/>:
                    <table className="table target-group-table main-content">
                    <thead>
                        <tr>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.TargetGroups.map(function(item, index){
                            return (
                                <tr className="target-group" key={index} rowSpan="3">
                                    <td className="name"><div className="group-name"><span className="glyphicon glyphicon-arrow-down"/> {item.name}</div>
                                        <ParticipantTable Participants={item.participantSet}/>
                                        <div className="edit-container">
                                            <Link to={"/app/target-group/"+item.id} className="target-group-view-btn btn btn-default">Edit</Link>
                                        </div>

                                    </td>
                                </tr>)
                            }.bind(this))
                        }
                    </tbody>
               </table>
    }

}

export default TargetGroupsTable