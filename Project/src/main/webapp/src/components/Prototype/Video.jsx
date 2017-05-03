
import React from 'react';
import Webcam from './Webcam.jsx'
import $ from 'jquery';
import {captureUserMedia, getRecordRTCObject} from "./AppUtils.jsx";

class Video extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            src: "",
            recordRTC: {},
            isRecording: false,
            data: {}
        };
        this.startRecord = this.startRecord.bind(this);
        this.stopRecord = this.stopRecord.bind(this);
        this.upload = this.upload.bind(this);
    }
    render(){
        return (
            <div>
                <Webcam src={this.state.src}/>
                <button className="btn" onClick={this.startRecord} disabled={this.state.isRecording}>Start Recording</button>
                <button className="btn" onClick={this.stopRecord} disabled={!this.state.isRecording}>Stop Recording</button>
                <button className="btn" onClick={this.upload}>Upload Recording</button>
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
        captureUserMedia((stream) => {
           this.setState({
               src: window.URL.createObjectURL(stream)
           });
        });
    }
    startRecord(){
        let recordRTC;
        this.toggleRecording();
        captureUserMedia((stream) => {
            let params = {
              mimeType: 'video/webm'
            };
            recordRTC = getRecordRTCObject(stream, params);
            recordRTC.startRecording();
            let videoElement = document.querySelector('video');
            this.setState({
                src: window.URL.createObjectURL(stream),
                recordRTC: recordRTC
            });
            videoElement.play();
        });
    }
    stopRecord(){
        let videoElement = document.querySelector('video');
        this.toggleRecording();
        videoElement.pause();
        let recordRTC = this.state.recordRTC;
        recordRTC.stopRecording((url) => {
           this.setState({
               src: url,
               data: recordRTC.getBlob()
           });
           const blob = recordRTC.getBlob();
           console.log("Got the blob:", blob);
           videoElement.controls = true;
        });
    }
    upload(){
        const blob = this.state.data;
        const type = blob.type;
        const size = blob.size;
        console.log("Blob: ", blob);
        console.log("Type: ", type);
        console.log("Size: ", size);
        // $.ajax({
        //     method: "POST",
        //     url: "/files/upload",
        //     data: this.state.data,
        //     contentType: this.state.data.
        // }).done(function (msg) {
        //     alert("Data saved" + msg);
        // });
    }



}

export default Video;