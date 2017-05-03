import React from 'react';
import Player from './Player.jsx'
import $ from 'jquery';

import {captureUserAudio, getRecordRTCObject} from "./AppUtils.jsx";

class Audio extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            src: "",
            recordRTC: {},
            isRecording: false,
            onSaved: this.props.onSaved
        };
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
    }
    render(){
        return(
            <div>
                <Player src={this.state.src} />
                <button className="btn" onClick={this.startRecord} disabled={this.state.isRecording}>Record</button>
                <button className="btn" onClick={this.stopRecord} disabled={!this.state.isRecording}>Stop Recording</button>
            </div>
        );
    }
    toggleRecording(){
        this.setState({
            isRecording: !this.state.isRecording
        });
    }
    componentDidMount(){
        if(!navigator.mediaDevices.getUserMedia){
            alert("This browser does not support this");
            return;
        }
        this.requestUserMedia();
    }
    requestUserMedia(){
        captureUserAudio((stream) => {
            this.setState({
                src: window.URL.createObjectURL(stream)
            });
        });
    }
    startRecord(){
        let recordRTC;

        this.toggleRecording();

        captureUserAudio((stream) => {
           let params = {
               mimeType: 'audio/mpeg',
               type: 'audio'
           };
           recordRTC = getRecordRTCObject(stream, params);
           recordRTC.startRecording();
           let audioElement = document.querySelector('audio');
           audioElement.controls = true;
           this.setState({
               src: window.URL.createObjectURL(stream),
               recordRTC: recordRTC,
           });
           audioElement.play();
        });
    }
    stopRecord(){
        let audioElement = document.querySelector('audio');

        this.toggleRecording();

        audioElement.pause();
        let recordRTC = this.state.recordRTC;
        recordRTC.stopRecording((url) => {
            this.setState({
                src: url
            });
            const blob = recordRTC.getBlob();
            console.log('Got blob object: ', blob);
            audioElement.controls = true;

        });
    }
}

export default Audio;