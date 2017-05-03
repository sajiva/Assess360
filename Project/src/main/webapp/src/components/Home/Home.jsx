import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router';
import BasicSideToolBox from 'components/Template/PageContent.jsx';
import TargetGroups from 'components/TargetGroup/TargetGroups.jsx';
import TargetGroupButTogether from '../TargetGroup/TargetGroupButTogether.jsx';
class Home extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <BasicSideToolBox PageTitle="Home">
                <div className="pull-left">
                    <Link className="btn btn-default" to="/app/target-groups" role="button"><i className="glyphicon glyphicon-plus"/> Add new target group</Link>
                </div>
                <div className="pull-right">
                    <Link className="btn btn-default" to="/app/assessments/create" role="button"><i className="glyphicon glyphicon-plus"/> Add new assessment</Link>
                </div>
                <TargetGroupButTogether/>
            </BasicSideToolBox>
        );
    }
}

export default Home;