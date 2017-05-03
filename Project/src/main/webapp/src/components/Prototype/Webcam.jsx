import React from 'react';
import RecordRTC from 'recordrtc';
import $ from 'jquery';
import {captureUserMedia} from './AppUtils.jsx';
class Webcam extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <video src={this.props.src}/>
            </div>
        )
    }
}

export default Webcam;