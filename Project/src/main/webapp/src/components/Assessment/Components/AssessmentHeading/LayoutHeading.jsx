import React from 'react';
import AssessmentTab from 'components/Assessment/Components/AssessmentHeading/Components/AssessmentTab.jsx';
import AssessmentPageTitle from 'components/Assessment/Components/AssessmentHeading/Components/AssessmentPageTitle.jsx';
import UserProfileReference from 'components/Assessment/Components/AssessmentHeading/Components/UserProfileReference.jsx';
class LayoutHeading extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (<div className="top-main-header">
                    <AssessmentTab        {...this.props}/>
                    <AssessmentPageTitle  {...this.props}/>
            {this.props.DontCheckUser ||
                   <UserProfileReference {...this.props}/>}
                </div>);
    }
}

export default LayoutHeading