import React from 'react';

class AssessmentsDropDown extends React.Component {

    static defaultProps={
        handleChange:function(){}
    };
    static propTypes={
        handleChange:React.PropTypes.func,
        assessments:React.PropTypes.array.isRequired
    };
    constructor(props) {
        super(props);

        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(e){
        let id=e.target.value;
        let assessmentFound=this.props.assessments.find((assessment)=>{
            if(assessment.id==id){
                return assessment;
            }
        });

        this.props.handleChange(assessmentFound);
    }
    render() {
        const $assessments = this.props.assessments.map(function(item, index) {
            return (
                <option key={index+1} value={item.id}>{item.name}</option>
            )
        });
        return (
            <div className="group-dropdown" ref="dropdown">
                <select onChange={this.handleChange}>
                    <option key={0} value={''}>Select an Assessment</option>
                    {$assessments}
                </select>
            </div>
        )
    }
}

export default AssessmentsDropDown;