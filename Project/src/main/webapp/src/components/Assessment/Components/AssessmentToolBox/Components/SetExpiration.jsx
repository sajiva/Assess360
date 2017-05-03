import React from 'react';
import Popup from 'react-popup';
import DatePicker from 'react-bootstrap-date-picker';
import {Modal, ButtonGroup, Button} from 'react-bootstrap';


class SetExpiration extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: (new Date(this.props.expirationDate)).toString(),
            done: false,
            setting:false
        };
        var date;
        date =(new Date(this.props.expirationDate));
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        this.state.value=date;

        this.updateState = this.updateState.bind(this);
        this.submitDate = this.submitDate.bind(this);
        this.cancelSubmision=this.cancelSubmision.bind(this);
        this.setExpiration=this.setExpiration.bind(this);
    }
    componentWillReceiveProps(props){
        let date =(new Date(props.expirationDate));
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2) + ' ' +
            ('00' + date.getUTCHours()).slice(-2) + ':' +
            ('00' + date.getUTCMinutes()).slice(-2) + ':' +
            ('00' + date.getUTCSeconds()).slice(-2);
        this.setState({
            value:date,
            setting:false
        });
    }
    setExpiration(event)
    {
        debug("setExpiration");
        this.setState({
            done:true
        });
    }
    cancelSubmision(event)
    {
        debug("cancelSubmision");
        this.setState({
            done:false
        });
    }

    //Handles date submission
    submitDate(event)
    {
        debug("submitDate");
        this.setState(
        {
            setting:true,
            done: false
        },function(){
            debug("SetExpir",this.state);
            this.props.onSaveChanges({expirationDate:this.state.value});
        }.bind(this));
    }
    updateState(value) {
        this.setState({
            value: value
        },function(){
            this.submitDate();
        }.bind(this));
    }

    //Renders datepicker object so that the user can select a date via calendar pop-up
    render() {
        return  <div   className="top-header-expiration-date-container">
            {this.state.done?(

                    <div style={{display:"inline-block"}} className="set-expiration-date-container" >
                        {this.state.setting?"Setting...":(this.state.value?("Exp. "+this.state.value):"Set Expiration Date")}
                        <DatePicker calendarContainer={document.body} autoFocus={true} id="date-picker"  value={this.state.value} onChange={this.updateState}/>
                    </div>
                ):
                <span onClick={this.setExpiration}>{this.state.setting?"Setting...":(this.state.value?("Exp. "+this.state.value):"Set Expiration Date")}</span>
                }


                </div>
    }
}
SetExpiration.propTypes={
    expirationDate:React.PropTypes.number,
    onSaveChanges:React.PropTypes.func
};

export default SetExpiration;