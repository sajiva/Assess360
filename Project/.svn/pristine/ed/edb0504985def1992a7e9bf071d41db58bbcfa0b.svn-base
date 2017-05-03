import React from 'react';
import AssessmentTimer from "components/Prototype/AssessmentTimer.jsx";
class AssessmentTimeAllowed extends React.Component{

    constructor(props){
        super(props);

        this.state={
            IsTimed:this.props.initialTime?true:false,
            CurrentTime:this.props.initialTime?this.props.initialTime:0
        };

        /*******************************************************************/
        this.save=function(data)
        {
            debug("AssessmentTimmer.save",data,this.props.onChanged);
            this.setState(data,function()
            {
                if(this.props.onSaveChanges)
                {
                    debug("AssessmentTimer.save -> onChanged",this.state);
                    this.props.onSaveChanges(
                        {
                            allowed_time_sec: this.state.CurrentTime,
                            istimed: this.state.IsTimed
                        });
                }

            }.bind(this));
        }.bind(this);

        /*******************************************************************/
        this.enableAllowedTime=function()
        {
            this.save({  IsTimed:true  });
        }.bind(this);


        /*******************************************************************/
        this.disableAllowedTime=function(){
            this.save({  IsTimed:false  });
        }.bind(this);

        /*******************************************************************/
        this.setTime=function(time){
            debug("AssessmentTimer: setTime",time);
            this.save({  CurrentTime:time["allowed_time_sec"],
                IsTimed:time["istimed"]});
        }.bind(this);
    }
    componentWillReceiveProps(props){
        this.setState({
            IsTimed:this.props.initialTime?true:false,
            CurrentTime:this.props.initialTime?this.props.initialTime:0
        });
    }
    render()
    {
        return (<div className={this.state.IsTimed?"allowed-timed is-timed":"allowed-timed"}>
            {this.state.IsTimed?
                (<div><AssessmentTimer isSaving={this.context.isSaving} onSavedTime={this.setTime} timeInSeconds = {this.state.CurrentTime}
                                       istimed = {this.state.IsTimed}/>
                    <div onClick={this.disableAllowedTime} className="set-time-allowed-disabled-btn"></div>
                </div>):
                (<div className='time-allowed'>
                    <div onClick={this.enableAllowedTime} className="">
                        <i className="fa fa-clock-o"/>
                        Set Time allowed
                    </div>
                </div>)

            }
        </div>);

    }
}
AssessmentTimeAllowed.contextTypes={
    isSaving:React.PropTypes.bool,
};

AssessmentTimeAllowed.propTypes={

    initialTime:React.PropTypes.number,
    onSaveChanges:React.PropTypes.func
};


export default AssessmentTimeAllowed
