import APIListener from './APIListener.jsx';
import Rests from '../../libaries/Rest.jsx';

class FileResourceAPI extends APIListener {

    constructor() {
        super();

        let $this = this;
        this.addModule("upload-image",function(data,done){
            $this.AjaxCall({
                url: '/rest/image',
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
        });
    }

}

FileResourceAPI.instance = new FileResourceAPI();
export default FileResourceAPI;