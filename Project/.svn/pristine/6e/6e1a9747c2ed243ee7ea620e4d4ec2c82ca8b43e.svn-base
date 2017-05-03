import React from 'react';
import SideToolBox from './SideToolBox.jsx';
import {Link, browserHistory} from 'react-router';
import {OverlayTrigger,Tooltip} from 'react-bootstrap';
class BasicSideToolBox extends React.Component{


    constructor(props){
        super(props);
    }
    render(){

        const tooltiGoHome = (
            <Tooltip id="tooltip"><h4>Home</h4></Tooltip>
        );
        const tooltipGoToProfile = (
            <Tooltip id="tooltip"><h4>User Profile</h4></Tooltip>
        );
        const tooltipCreateAssessment = (
            <Tooltip id="tooltip"><h4>Create Assessment</h4></Tooltip>
        );
        const tooltipAssessmentManager = (
            <Tooltip id="tooltip"><h4>Assessment Center</h4></Tooltip>
        );
        return <SideToolBox {...this.props}>

                 <Link to={"/app/home"} className="home-btn">
                     <OverlayTrigger placement="right" overlay={tooltiGoHome}>
                        <span className="glyphicon glyphicon-home"/>
                     </OverlayTrigger>
                 </Link>

                 <Link to={"/app/profile"} className="home-btn">
                     <OverlayTrigger placement="right" overlay={tooltipGoToProfile}>
                        <span className="glyphicon glyphicon-user"/>
                     </OverlayTrigger>
                 </Link>


                 <Link to={"/app/assessments/create"} className="home-btn">
                     <OverlayTrigger placement="right" overlay={tooltipCreateAssessment}>
                        <span className="glyphicon glyphicon-plus"/>
                     </OverlayTrigger>
                 </Link>


                 <Link to={"/app/assessments"} className="home-btn">
                     <OverlayTrigger placement="right" overlay={tooltipAssessmentManager}>
                        <span className="glyphicon glyphicon-check"/>
                     </OverlayTrigger>
                 </Link>

               </SideToolBox>;
    }
}

export default BasicSideToolBox