import APIListener  from './APIListener.jsx';

class TestAPI extends APIListener {

    constructor() {
        super();
        const $this = this;

        this.addModule("import-emails",function(data,done){

            $this.AjaxCall({
                url: "/rest/assessments",         // URL
                method: "POST",                   // METHOD
                contentType: "application/json",  // What type of content we are sending
                data: JSON.stringify(data)        // The actual data... Sending...
            },function (data) {                   // We made it, what came back?
                done({
                    url:"/app/assessments/" + data.id
                });
            });

        });
    }
}
TestAPI.instance=new TestAPI();
