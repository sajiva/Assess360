import React from 'react';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';
import {Link} from 'react-router';
import PageContent from 'components/Template/PageContent.jsx';
class NewOrExistingQuestionMiddlePage extends React.Component{

    constructor(props)
    {
        super(props);
    }
    componentWillReceiveProps(props){
        if(this.props.children!=props.children){
            this.context.NavigationInfo.DisableRightButton("Next","/app/home");
            this.context.NavigationInfo.EnableLeftButton("Back", "/app/assessments/"+this.props.Assessment.id+"/home");
        }
    }
    componentWillMount(){
        this.context.NavigationInfo.DisableRightButton("Next","/app/home");
        this.context.NavigationInfo.EnableLeftButton("Back", "/app/assessments/"+this.props.Assessment.id+"/home");
    }
    render()
    {
        return (React.Children.count(this.props.children) == 0) ? (<PageContent PageTitle="New or Existing Question">

                <div className="row">
                    <div className="container-for-new-or-existing">
                        <Link to={"/app/assessments/" + this.props.Assessment.id + "/add-question/existing-question"}  className="existing-question-container ">
                            <div className="btn btn-default btn-lg add-existing-question-btn">Add Existing Question</div>
                        </Link>
                        <Link to={"/app/assessments/" + this.props.Assessment.id + "/add-question/new-question"} className="new-question-container">
                            <div
                              className="btn btn-default btn-lg add-new-question-btn">Add New Question</div>
                        </Link>
                    </div>
                </div>
            </PageContent>) :
            (<div>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        Assessment: this.props.Assessment
                    });

                })}</div>);
    }
}
NewOrExistingQuestionMiddlePage.contextTypes={
    NavigationInfo:React.PropTypes.instanceOf(NavigationInfo)
};

export default NewOrExistingQuestionMiddlePage