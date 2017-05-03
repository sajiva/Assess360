import React from 'react';
import $ from 'jquery';
import APIComponent from 'components/Containers/APIComponent.jsx';
import UserAPI from 'libaries/APIs/UserAPI.jsx';
class EditUserInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { //Allows user to edit their information
        let title = (this.props.user.title == null) ? '': this.props.user.title;
        let organization = (this.props.user.organization == null) ? '': this.props.user.organization;
        let email = (this.props.user.email == null) ? '': this.props.user.email;
        return(
            <form  className="user-profile-edit" onSubmit={this.props.handleSubmit}>
                <input type="text" name="title" value={title} onChange={this.props.handleChange} placeholder="Title" className="form-control" autoFocus="true"/>
                <input type="text" name="organization" value={organization} onChange={this.props.handleChange} placeholder="Organization" className="form-control"/>
                <input type="text" name="email" value={email} onChange={this.props.handleChange} placeholder="Email" className="form-control"/>
                <button type="submit" className="my-button-class">Update Profile</button>
            </form>
        )
    }
}

export default EditUserInfo;