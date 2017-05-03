import React from 'react';
import {browserHistory} from 'react-router';
class TargetGroupAssessments extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const $assessments = this.props.assessments.map(function (item, index) {
            return (
                <tr key={index} onClick={()=>
                {
                    browserHistory.push("/app/assessments/"+item.id);
                }}><td>{item.name}</td></tr>
            )
        });

        return (
            <table className="table table-bordered assessments-table">
                <thead>
                    <tr>
                        <th>Assessments</th>
                    </tr>
                </thead>
                <tbody>
                {$assessments}
                </tbody>
            </table>
        )
    }
}

export default TargetGroupAssessments;