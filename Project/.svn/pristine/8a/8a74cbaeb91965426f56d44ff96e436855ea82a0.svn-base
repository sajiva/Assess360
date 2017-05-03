import React from 'react';
import AssessmentQuestions from 'components/Assessment/Pages/AssessmentHome/Components/AssessmentQuestions.jsx';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
import { browserHistory } from 'react-router';
import PageContent from 'components/Template/PageContent.jsx';
import AssessmentPageTitle from 'components/Assessment/Components/AssessmentHeading/Components/AssessmentPageTitle.jsx';
import AssessmentToolBox from 'components/Assessment/Components/AssessmentToolBox/AssessmentToolBox.jsx';
class AssessmentHomePage extends React.Component{

    constructor(props)
    {
        super(props);
    }
    componentWillMount(){
        this.context.Load();
        this.context.NavigationInfo.EnableRightButton("Review","app/assessments/"+this.props.Assessment.id+"/review");
        this.context.NavigationInfo.EnableLeftButton("Back", "/app/home");
    }
    render()
    {
        return <PageContent SidePanel={null} PageTitle="New Assessment" NoContainer={true}>

                    <div className="top-header-container">
                        <AssessmentPageTitle PageTitle={"Build your Assessment"}/>
                        <AssessmentToolBox {...this.props} />
                    </div>
                    <div className="container">
                        <AssessmentQuestions Assessment={this.props.Assessment}  />
                    </div>
               </PageContent>
    }

}
AssessmentHomePage.contextTypes={
    NavigationInfo:React.PropTypes.instanceOf(NavigationInfo),
    Load:React.PropTypes.func
};

export default AssessmentHomePage