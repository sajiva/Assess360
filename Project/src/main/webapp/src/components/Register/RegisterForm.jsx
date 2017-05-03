import React from 'react';

import RegisterTextForm from './RegisterTextForm.jsx';
class RegisterForm extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="register-form">
                    <RegisterTextForm {...this.props}/>
               </div>
    }
}

export default RegisterForm