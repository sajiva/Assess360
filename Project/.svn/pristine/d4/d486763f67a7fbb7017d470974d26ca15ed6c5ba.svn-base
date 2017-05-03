import APIListener from './APIListener.jsx';
export default class QuestionsAPI extends APIListener{
    constructor(){
        super();
        const instance = this;
        this.addModule("create-new-question", function (data, done) {
           instance.AjaxCall({
              url: "/rest/questions",
               method: "POST",
               contentType: "application/json",
               data: JSON.stringify(data)
           }, function (data) {
               done({success:true});
           });
        });
        
        this.addModule("get-question", function (data, done) {
            instance.AjaxCall({
                url: "/rest/questions/" + data.id + "/",
                method: "GET",
            }, function (data) {
                done({
                    questionData: data
                });
            });
        });

        this.addModule("update-question", function (data, done) {
           instance.AjaxCall({
               url: "/rest/questions/" + data.id,
               method: "PATCH",
               contentType: "application/json",
               data: JSON.stringify(data)
           }, function (data) {
               done({
                  questionData: data
               });
           });
        });

        this.addModule("delete-question", function (data, done) {
           instance.AjaxCall({
               url: "/rest/questions/" + data.id,
               method: "DELETE"
           }, function (data) {
               done({success:true});
           })
        });
    }
}