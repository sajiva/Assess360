import React from 'react';
import UserAPI from 'libaries/APIs/UserAPI.jsx';
import Loader from 'components/Containers/Loader.jsx';
import LoginPage  from "components/UserLogin/LoginPage.jsx";
import RegisterPage from 'components/Register/RegisterPage.jsx';
import PageContent from 'components/Template/PageContent.jsx';
class GuestHome extends React.Component{

    constructor(props){
        super(props);
        this.state={
            checkingUser:true,
            login:false
        }
    }
    componentWillMount(){
        UserAPI.instance.quick("check-if-logged-in",{},function(data){
            if(data.data.success)
            {
                window.location="/app/home";
            }
            else{
                this.setState({
                    checkingUser:false
                });
            }
        }.bind(this));
    }
    render() {

        var final=<Loader/>;
        if (!this.state.checkingUser) {

            if (this.state.login) {
                final= (<div>
                    <div className="login-or-register-container">
                        <div onClick={() => {
                            this.setState({login: !this.state.login})
                        }} className="register-container">
                            Register
                        </div>
                    </div>
                    <LoginPage {...this.props}/>
                </div>);
            }
            else {
                final = (<div>
                    <div className="login-or-register-container">
                        <div onClick={() => {
                            this.setState({login: !this.state.login})
                        }} className="register-container">
                            Login
                        </div>
                    </div>
                    <RegisterPage {...this.props}/>
                </div>);
            }
        }

        return (<PageContent PageTitle={this.state.login?"Login":"Register"} DontCheckUser={true} SidePanel={<div></div>}>
                    {final}
                </PageContent>);
    }


}

export default GuestHome