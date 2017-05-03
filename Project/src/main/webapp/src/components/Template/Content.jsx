import React from "react";
import {Router, Route, browserHistory,DefaultRoute, IndexRoute} from "react-router";
import Home from "components/Home/Home.jsx";
import GuestHome from "components/Home/GuestHome.jsx";

import Questions from "components/Questions/Questions.jsx";
import Video from "components/Prototype/Video.jsx";
import Audio from "components/Prototype/Audio.jsx";
import FileTests from "../Prototype/FileTests.jsx";

import TargetGroups from "components/TargetGroup/TargetGroups.jsx";
import LoginPage  from "components/UserLogin/LoginPage.jsx";
import AssessmentTable from "components/UserAssessments/components/AssessmentTable.jsx";


import AssessmentTimer from "components/Prototype/AssessmentTimer.jsx";
import TargetGroup from "components/TargetGroup/TargetGroup.jsx";
import UserHome from "components/Home/UserHome.jsx";
import ImportEmails from "components/TargetGroup/ImportEmails.jsx";
import AssessmentTargetGroup from "components/Prototype/AssessmentTargetGroup.jsx";
import AssessmentNew from "components/Assessment/Pages/NewAssessment/AssessmentNew.jsx";
import Assessment from "components/Assessment/Assessment.jsx";
import AssessmentHomePage from "components/Assessment/Pages/AssessmentHome/AssessmentHomePage.jsx";
import NewOrExistingQuestionMiddlePage from "components/Assessment/Pages/NewOrExistingQuestionMiddlePage/NewOrExistingQuestionMiddlePage.jsx";
import NewQuestion from "components/Assessment/Pages/NewQuestion/NewQuestion.jsx";
import AddExistingQuestion from "components/Assessment/Pages/AddExistingQuestion/AddExistingQuestion.jsx";
import PreviewAssessmentsPage from "components/Assessment/Pages/PreviewAssessmentsPage/PreviewAssessmentsPage.jsx";
import UserProfile from "../Profile/UserProfile.jsx";
import RegisterPage from 'components/Register/RegisterPage.jsx';
import ReviewPage from '../Assessment/Pages/ReviewPage/AdminReview.jsx';
class App extends React.Component {

    constructor(props) {
        super(props);

    }
    getChildContext(){
        return {
            root:this.root
        };
    }
    componentDidMount(){

    }
    render() {
        return (
            <div className="" ref={(input) => { this.root = input; }}>
                <Router history={browserHistory}>
                    <Route path="/" component={GuestHome}>
                        <IndexRoute components={RegisterPage}/>
                    </Route>
                    <Route path="/app" component={UserHome}>
                        <IndexRoute component={Home}/>
                        <Route path="home" component={Home}/>
                        <Route path="target-groups" component={TargetGroups}/>
                        <Route path="target-groups/import-emails" component={ImportEmails}/>
                        <Route path="assessments" component={AssessmentTable}/>
                        <Route path="participant-popup" component={AssessmentTargetGroup}/>
                        <Route path="questions" component={Questions}/>
                        <Route path="target-group/:targetGroup" component={TargetGroup}/>
                        <Route path="prototype" component={Video}/>
                        <Route path="fileTests" component={FileTests}/>
                        <Route path="audioPrototype" component={Audio}/>
                        <Route path="assessmentTimer" component={AssessmentTimer}/>
                        <Route path="assessments/create" component={AssessmentNew} />
                        <Route path="assessments/:assessmentID" component ={Assessment}>
                            <IndexRoute component={AssessmentHomePage}/>
                            <Route path="home" component={AssessmentHomePage}/>
                            <Route path="add-question" component={NewOrExistingQuestionMiddlePage}>
                                <Route path="new-question" component={NewQuestion}/>
                                <Route path="existing-question" component={AddExistingQuestion}/>
                            </Route>
                            <Route path="preview" component={PreviewAssessmentsPage}/>
                            <Route path="review" component={ReviewPage}/>
                        </Route>
                        <Route path="profile" component={UserProfile} />
                    </Route>

                </Router>
            </div>

        )
    }
}
App.childContextTypes={
    root:React.PropTypes.element
}
export default App;