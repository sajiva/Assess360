import React from 'react';
import ProfilePic from './ProfilePic.jsx';

class ProfilePicContainer extends React.Component {

    state={
        ImageUploadValue:false
    };
    constructor(props) {
        super(props);

        this.onAskToUpload=this.onAskToUpload.bind(this);
        this.uploadChanged=this.uploadChanged.bind(this);
    }
    onAskToUpload(){
        $(this.form).click();
    }
    uploadChanged(e){
        this.setState({
            ImageUploadValue:e.target.value
        },()=>{
            this.props.handleChange(e);
        });
    }
    render() {
        let uploadPic = this.props.editing ?
            <form encType="multipart/form-data" action="#">
                <div className="profile-pic-upload-container"><div className="profile-pic-upload-button" onClick={this.onAskToUpload}>{this.state.ImageUploadValue?"Ready":"Upload"}</div></div>
                <input ref={(ref)=>{this.form=ref}} onChange={this.uploadChanged} type="file" style={{display:"none"}} required="true" accept="image/*" />
            </form>    :
            null;
        return (
            <div className="profile-pic-container">
                <ProfilePic photo = {this.props.photo}/>
                {uploadPic}
            </div>
        )
    }

}

export default ProfilePicContainer;