import React from 'react';
import DisplayUserInfo from './DisplayUserInfo.jsx';
import EditUserInfo from './EditUserInfo.jsx';
import ProfilePicContainer from './ProfilePicContainer.jsx';
import UserAPI from 'libaries/APIs/UserAPI.jsx';
import PageContent from 'components/Template/PageContent.jsx';
import FileResourceAPI from 'libaries/APIs/FileResourceAPI.jsx';

class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: '',
            editing: false,
            file: '',
            previewUrl:''
        };

        this.apiHook=UserAPI.instance.hook()
            .on("get-user-profile", function (data) {
                this.setState({
                    user:data.data
                });

                if (this.state.user.photo != null) {
                    let image = `/rest/image/${this.state.user.username}`;
                    this.setState({
                        previewUrl: image
                    });
                }
            }.bind(this));

        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
    }

    componentDidMount() {
        this.apiHook.open();
        UserAPI.instance.initiate("get-user-profile");
    }
    componentWillUnmount(){
        this.apiHook.close();
    }

    handleEdit() {
        this.setState({
            editing: true
        });
    }

    handleUpdate(event) {
        event.stopPropagation();
        event.preventDefault();
        UserAPI.instance.initiate("update-user-profile",this.state.user);

        if (this.state.file != '') {
            let data = new FormData();
            data.append('uploadedFile', this.state.file);
            FileResourceAPI.instance.initiate("upload-image", data);
        }

        this.setState({
            editing: false,
        });
    }

    handleChange(event) {
        this.setState({
            user: $.extend(this.state.user,{
                [event.target.name]: event.target.value
            })
        });
    }

    handleFileChange(event) {
        let file = event.target.files[0];

        if (file != undefined && (/\.(png|jpg)$/).test(file.name)){
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = this.handleOnLoad;

            this.setState({
                file: file
            });
        } else {
            console.log("Not image file");
            this.setState({
                file: ''
            });
        }
    }

    handleOnLoad(event) {
        this.setState({
            previewUrl: event.target.result
        });
    }

    render() {
        let userInfo = this.state.editing ?
            <EditUserInfo user = {this.state.user} handleSubmit={this.handleUpdate} handleChange={this.handleChange}/> :
            <DisplayUserInfo user={this.state.user} handleOnClick={this.handleEdit}/>;

        return (
            <PageContent PageTitle="User Profile">
                <div className="main-container">
                    <div className="user-profile-name">{this.state.user.username}</div>
                    <div className="user-profile-container">
                        <ProfilePicContainer photo={this.state.previewUrl} editing={this.state.editing} handleChange={this.handleFileChange}/>
                        <div className="user-info-container">
                            {userInfo}
                        </div>
                    </div>
                </div>
            </PageContent>
        )
    }
}

export default UserProfile;