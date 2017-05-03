import React from 'react';

class DisplayUserInfo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { //Renders user info and displays on screen
        return(
            <div className="user-profile-view">
                <div>{this.props.user.title}</div>
                <div>{this.props.user.organization}</div>
                <div>{this.props.user.email}</div>
                <button className="my-button-class" onClick={this.props.handleOnClick}>Edit Profile</button>
            </div>
        )
    }
}

export default DisplayUserInfo;