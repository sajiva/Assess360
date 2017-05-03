import React from 'react';
import APIComponent from "components/Containers/APIComponent.jsx";
import AssessmentAPI from 'libaries/APIs/AssessmentAPI.jsx';

class AssessmentFetcher extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            Fetch: this.props.Fetch,
            Assessment: this.props.Assessment?this.props.Assessment:([])[0]
        };

        this.incomingAssessment=function(data){
            debug("AssessmentFetcher: incomingAssessment",data);
            this.setState({
                Fetch:false,
                Assessment:data
            },function(){
                debug("AssessmentFetcher: about to call onLoaded",this.props.onLoaded);
                this.props.onLoaded(data);
            }.bind(this));
        }.bind(this);

    }


    render(){
        return (<div className="assessment-data">
            <APIComponent Fetch={this.state.Fetch} onSubmit={this.incomingAssessment} APIListener={AssessmentAPI.instance} Event="get-assessment" initialInput={{assessmentID:this.props.AssessmentID}} >
                {function(data,change,send,setData,isLoading){
                    if(this.state.Assessment){
                        return this.props.children(data,send,isLoading); // function (assessment, refresh, isLoading
                    }
                    return null;
                }.bind(this)}
            </APIComponent>
        </div>);
    }
}
AssessmentFetcher.propTypes={
    children:React.PropTypes.func,
    AssessmentID:React.PropTypes.number,
    Fetch:React.PropTypes.bool,
    onLoaded:React.PropTypes.func
};


export default AssessmentFetcher