import React from 'react';
import PageContent from 'components/Template/PageContent.jsx';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
import ExistingQuestions from 'components/Assessment/Components/ExistingQuestions/ExistingQuestions.jsx';


class AddExistingQuestion extends React.Component{
    constructor(props){
        super(props);

        this.state={
            Save:false
        };
    }

    render(){
        const assessmentID = this.props.Assessment.id;
        return (
            <PageContent PageTitle="Existing Question">
                <ExistingQuestions assessmentID={assessmentID}/>
            </PageContent>
        );
    }
}
AddExistingQuestion.contextTypes={
    router: React.PropTypes.object.isRequired,
    Assessment:React.PropTypes.object,
    NavigationInfo:React.PropTypes.instanceOf(NavigationInfo)
};


export default AddExistingQuestion;