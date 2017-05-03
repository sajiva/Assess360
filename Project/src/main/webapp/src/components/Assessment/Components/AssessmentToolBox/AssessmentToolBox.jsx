import React from 'react';
import AssessmentTimeAllowed from 'components/Assessment/Components/AssessmentToolBox/Components/AssessmentTimeAllowed.jsx';
import AssessmentExpirationDate from 'components/Assessment/Components/AssessmentToolBox/Components/AssessmentExpirationDate.jsx'
import {Link} from 'react-router';

class AssessmentToolBox extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            Assessment:this.props.Assessment,
            timeAllowedEditing:false,
            expirationDateEditing:false,
            previewShowing:false // Needs to be a route

        }



    }
    componentWillReceiveProps(props){
        this.setState({
            Assessment:props.Assessment
        });
    }
    render() {
        return (<div className="top-header-tools">


            {/**************************************************************/}
            {/* Assessment Time Allowed                                    */}
            {/**************************************************************/}
            <div className="top-header-time-allowed-container">
                <AssessmentTimeAllowed  initialTime={this.state.Assessment["istimed"]?this.state.Assessment["allowed_time_sec"]:-1} {...this.props}/>
            </div>
            {/**************************************************************/}


            <AssessmentExpirationDate initialExpirationdate={this.state.Assessment["expirationDate"]} {...this.props}/>
            <Link to={"/app/assessments/"+this.state.Assessment.id+"/preview"} className="btn preview-btn">Preview</Link>




        </div>)
    }
}
AssessmentToolBox.propTypes={
    onSaveChanges:React.PropTypes.func.isRequired,
    Assessment:React.PropTypes.object.isRequired
};
AssessmentToolBox.contextTypes={
    root:React.PropTypes.element
};

export default AssessmentToolBox