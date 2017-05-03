import APIListener from "./APIListener.jsx";

class ParticipantAPI extends APIListener{


    constructor()
    {
        super();

        var $this=this;

        /*******************************************************************/
        this.addModule("add-participants",function(data,done){
            $this.AjaxCall({
                url: "/rest/participants",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(data.participants),
                cache:false
            },function (data) {
                //data == []
                done({participants:data});
            });
        });

        /*******************************************************************/
        this.addModule("get-participants",function(data,done){
            $this.AjaxCall({
                url: "/rest/participants",
                method: "GET",
                contentType: "application/json",
                cache:false
            },function (data) {
                //data == [ [}, {}, {}]
                done({participants:data});
            });
        });

    }




}
ParticipantAPI.instance=new ParticipantAPI();

export default ParticipantAPI;