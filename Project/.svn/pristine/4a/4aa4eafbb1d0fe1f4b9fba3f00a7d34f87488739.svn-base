import RecordRTC from 'recordrtc';

/**
 *
 * @param callback
 */
export function captureUserMedia(callback){ //records video and audio from the user
    let params = { audio: true, video: true, bitsPerSecond: 128000, frameInterval: 30 };
    navigator.getUserMedia(params, callback, (error) => {
        alert(JSON.stringify(error));
    });
}

export function captureUserAudio(callback){ //records audio from the user
    let params = {audio: true, video: false, audioBitsPerSecond: 128000};
    navigator.getUserMedia(params, callback, (error) => {
       console.log(JSON.stringify(error));
    });
}

/**
 *
 * @param stream
 * @param params
 * @returns {RecordRTC}
 */
export function getRecordRTCObject(stream, params){
    let videoRecord = new RecordRTC(stream, params);
    return videoRecord;
}