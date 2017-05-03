import React from 'react';

class AssessmentPageTitle extends React.Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (<div className="top-header-title"> {this.props.PageTitle} </div>);
    }
}
AssessmentPageTitle.propTypes={
    PageTitle:React.PropTypes.string.isRequired,
    UserInfo:React.PropTypes.object
};

export default AssessmentPageTitle