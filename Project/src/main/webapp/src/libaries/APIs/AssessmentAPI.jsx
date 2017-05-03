import APIListener from "./APIListener.jsx";

class AssessmentAPI extends APIListener{


    constructor()
    {
        super();
        var $this=this;

        /*******************************************************************/
        this.addModule("create-new-assessment",function(data,done){
            $this.AjaxCall({
                url: "/rest/assessments",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                cache:false
            },function (data) {
                done(data);
            });
        });

        /*******************************************************************/
        this.addModule("add-question-to-assessment",function(data,done)
        {
            /***************************************************************/
            /* Fix the Context before sending                              */
            /***************************************************************/
            if(typeof data.content == 'object'){
                data.content=JSON.stringify(data.content);
            }

            /***************************************************************/
            $this.AjaxCall({
                url: "/rest/assessments/" + data.assessmentID + "/question",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(data),
                cache:false
            },function (output) {
                 done({success:true});
                AssessmentAPI.instance.initiate("get-assessment",data);
            });

        });


        this.addModule("add-existing-question-to-assessment", function (data, done) {
           $this.AjaxCall({
               url: "/rest/assessments/"+ data.assessmentID +"/question/" + data.questionId,
           },function(output) {
              done({success:true});
              AssessmentAPI.instance.initiate("get-assessment", data);
           });
        });

        /*******************************************************************/
        this.addModule("save-assessment-assessment",function(data,done){
            $this.AjaxCall({
                url: "/rest/assessments/" + data.assessmentID + "",
                method: "PATCH",
                contentType: "application/json",
                data: JSON.stringify(data),
                cache:false
            },function () {
                done({success:true});
                AssessmentAPI.instance.initiate("get-assessment",data);
            });

        });

        /*******************************************************************/
        this.addModule("get-assessment",function(data,done){
            $this.AjaxCall({
                url: "/rest/assessments/" + data.assessmentID + "/",
                method: "GET",
                contentType: "application/json",
                data: JSON.stringify(data.data),
                cache:false
            },function (data)
            {
                data.questionSet.sort(function(a,b){
                    return a.id-b.id;
                });
                done(data);
            });

        });

        /*******************************************************************/
        this.addModule("get-assessments",function(input,done){
            $this.AjaxCall({
                url: '/rest/assessments',
                method: 'GET',
                contentType: 'application/json',
                cache:false
            },function (data) {
                done({Assessments:data});
            });
        });

        this.addModule("add-target-group-to-assessment", function (data, done) {
            $this.AjaxCall({
                url: "/rest/assessments/"+ data.assessmentID +"/targetGroup/" + data.targetGroupId,
                method: 'POST'
            },function(output) {
                done(data);
            });
        });
        this.addModule("send-assessment", function (data, done) {
            $this.AjaxCall({
                url: "/rest/assessments/"+ data.assessmentID +"/send-assessment",
                data: JSON.stringify(data.Participants),
                contentType: 'application/json',
                method: 'POST'
            },function(output) {
                done(data);
            });
        });

    }




    createNewAssessmentAndRedirect(assessmentData){
        this.initiate("create-new-assessment",assessmentData);
    }

    /**
     * @function add
     * @param assessmentID
     * @param questionData
     */
    addNewQuestionToAssessment(assessmentID, questionData){
        this.initiate("add-question-to-assessment",$.extend(questionData,{assessmentID:assessmentID}));
    }

    saveAssessment(assessmentID, assessment){
        this.initiate("save-assessment-assessment",{assessmentID:assessmentID,data:assessment});
    }
}
AssessmentAPI.instance=new AssessmentAPI();

export default AssessmentAPI;