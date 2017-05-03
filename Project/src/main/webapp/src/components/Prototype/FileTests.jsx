import React from 'react';
import $ from 'jquery';

class FileTests extends React.Component{
    constructor(){
        super();
        this.state = {
            files: []
        };
    }

    render(){
        return(<div>
            <h2>File uploading testing</h2>
            <form id="fileUploadForm" encType="multipart/form-data" action="#">
                <input id="file" name="file" className="upload-file" type="file" onChange={(event) => {
                    console.log(event);
                    this.setState({
                       files: event.target.files
                    });
                }}/>
                <input type="submit" onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    let data = new FormData();
                    const files = this.state.files;
                    data.append('uploadedFile', files[0]);
                    $.ajax({
                        url: '/rest/files',
                        type: "POST",
                        data: data,
                        cache: false,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            console.log("File successfully uploaded");
                        },
                        error: function (data) {
                            console.log("ERROR");
                        }
                    });
                }}/>
            </form>
        </div>)
    }
}

export default FileTests;