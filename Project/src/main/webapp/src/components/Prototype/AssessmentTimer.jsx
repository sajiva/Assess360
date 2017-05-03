import React from 'react';
import Loader from '../Containers/Loader.jsx';
import $ from 'jquery';

class AssessmentTimer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allowed_time_sec: this.props.timeInSeconds,
            istimed: this.props.istimed,
            setting:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.setTimeAllowed = this.setTimeAllowed.bind(this);
        this.setting = this.setting.bind(this);
        this.notSetting = this.notSetting.bind(this);

    }
    componentWillReceiveProps(props){
        this.setState({
            allowed_time_sec: props.timeInSeconds,
            istimed: props.istimed,
        })
    }

    handleChange(event){

        if (event.key === 'Enter') {
           this.setTimeAllowed();
           return;
        }
        const timeInSeconds = event.target.value;


        this.setState({
            allowed_time_sec: timeInSeconds,
            istimed:true
        });
    }
    setting(){
        this.setState({
            setting:true
        })
    }
    notSetting(){
        this.setState({
            setting:false
        })
    }
    setTimeAllowed()
    {
        this.setState({
            setting: false
        });
        this.props.onSavedTime(this.state);
    }
    render(){
        debug("AssessmentTimer: render() -> ",this.state);
        return(
            <div className='time-allowed'>
                <div onClick={this.setting} className="">
                    <i className="fa fa-clock-o"/>
                    Time allowed ({this.props.isSaving?<Loader/>:this.state.allowed_time_sec?this.state.allowed_time_sec+" sec":""})
                </div>
                {this.state.setting?(
                        <input onBlur={this.notSetting} type="text" onKeyUp={this.handleChange}  />
                    ):""}


            </div>
        );
    }
}

export default AssessmentTimer;