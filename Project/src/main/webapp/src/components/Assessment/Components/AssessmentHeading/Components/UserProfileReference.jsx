import React from 'react';
import UserAPI from "libaries/APIs/UserAPI.jsx";
class UserProfileReference extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isOpened:false,
            loggedStatus:""
        }

        this.userMenuToggle=function(){
            this.setState({
                isOpened:!this.state.isOpened
            });
        }.bind(this)
        this.logout=this.logout.bind(this);
    }
    componentDidMount(){
        if(this.props.DontCheckUser){
            return;
        }
        UserAPI.instance.initiate('check-if-logged-in-and-redirect');
    }
    logout()
    {
        UserAPI.instance.logout();
    }
    render() {
        return (
            <div onClick={this.userMenuToggle} className="heading-user-info"><i className="fa fa-user-circle-o"></i>
                {this.state.isOpened?(<div className="user-options-container">
                    <div className="user-options-container">
                        <span onClick={this.logout} className="btn btn-primary log-out-button">Logout</span>
                    </div>
                        <div className="user-status-container">
                            <div className="user-status">
                                {/*this.state.loggedStatus*/}
                            </div>
                        </div>
                    </div>):null}
                    </div>);
    }

}
UserProfileReference.propTypes={
    UserInfo:React.PropTypes.object
};


export default UserProfileReference