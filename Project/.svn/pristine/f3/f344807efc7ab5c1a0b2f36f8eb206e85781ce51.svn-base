import React from 'react';
import AssessmentPreview from 'components/Assessment/Components/Preview/AssessmentPreview.jsx';
import PageContent from 'components/Template/PageContent.jsx';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
class PreviewAssessmentsPage extends  React.Component{
    static contextTypes={
        NavigationInfo:React.PropTypes.instanceOf(NavigationInfo),
        Load:React.PropTypes.func
    };

    componentWillMount(){
        this.context.NavigationInfo.EnableRightButton("Review","app/assessments/"+this.props.Assessment.id+"/review");
        this.context.NavigationInfo.EnableLeftButton("Back", "app/assessments/"+this.props.Assessment.id+"/home");

    }
    render() {
        return <PageContent PageTitle="Preview Assessment">
            <AssessmentPreview assessmentID={this.props.Assessment["id"]} questions={this.props.Assessment["questionSet"]}/>
        </PageContent>
    }

};

export default PreviewAssessmentsPage