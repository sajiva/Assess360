import APIListener from "./APIListener.jsx";
import Rests from "../../libaries/Rest.jsx";

class UserAPI extends APIListener{


    constructor()
    {
        super();
        var $this=this;

        /*******************************************************************/
        this.addModule("register",function(data,done){
            Rests.Lets().post("/rest/register",data
                ,function(data){
                done(data);

            });
        });
        this.addModule("log-in",function(data,done){
            Rests.Lets().post("/rest/session/login",{
                username:data.username,
                password:data.password
            },function(data){
                done(data);

            });

        });
        this.addModule("log-out",function(data,done){
            Rests.Lets().post("/rest/session/logout",{},function(data)
            {
                window.location='/';

            });

        });
        this.addModule("check-if-logged-in",function(data,done){
            Rests.Lets().get("/rest/session/is-logged-in",{},function(data){

                done(data);

            });


        });
        this.addModule("check-if-logged-in-and-redirect",function(data,done){
            Rests.Lets().get("/rest/session/is-logged-in",{},function(data){
                if(!data.success){
                    window.location="/";
                }
                done(data);

            });


        });

        /*******************************************************************/
        this.addModule("get-user-profile",function(data,done){
            Rests.Lets().get("/rest/currentUser",{},function(data){
                done(data);
            });


        });
        this.addModule("update-user-profile",function(data,done){
            $this.AjaxCall({
                url: "/rest/currentUser",
                method: "PATCH",
                contentType: "application/json",
                data: JSON.stringify(data),
                cache:false
            },function (data) {

                done(data);
            });


        });
    }

    hookToUser(callback){
        this.hook().on("get-user-profile",callback);
        this.initiate("get-user-profile");
    }
    login(username, password,callback){
        this.quick("log-in",{username:username,password:password},callback);
    }
    logout(){
        this.quick("log-out",{},function(){});
    }

}
UserAPI.instance=new UserAPI();

export default UserAPI;