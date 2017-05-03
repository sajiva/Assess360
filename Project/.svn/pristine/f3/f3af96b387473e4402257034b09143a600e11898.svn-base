import React from 'react';
import APIContainer from '../../components/Containers/APIComponent.jsx';
import UserAPI from 'libaries/APIs/UserAPI.jsx';
import $ from "jquery";
import Footer from 'components/Template/Footer.jsx';
import ProfilePicContainer from 'components/Profile/ProfilePicContainer.jsx';
import FileResourceAPI from 'libaries/APIs/FileResourceAPI.jsx';

const InputText = (props)=>{
    return <div className={(props.errorStatus?("has-"+props.errorStatus):"")+" form-group input-container "+props.name}>
                <input type={props.type} name={props.name} className={(props.errorStatus?("form-control-"+props.errorStatus):" ")+" form-control"} placeholder={props.placeholder} onChange={
                    (e)=>{props.onChange({[e.target.name]:e.target.value})}}/>
                {props.errorMessage?<div className="form-control-feedback">{props.errorMessage}</div>:null}
           </div>;
};


const TextInput=(oldProps)=>{
    let {type, ...props} = oldProps; // Remove type from props
    return <InputText type="text" {...props}/>
};
class PasswordInput extends React.Component{
    static propTypes={
        onStatusChange:React.PropTypes.func,
        onChange:React.PropTypes.func
    };

    constructor(props){
        super(props);
        this.state={
            data:{},
            confirmedPassword:"",
            isValid:false,
            errorMessage:""
        };

        this.update=this.update.bind(this);
    }
    setInvalid(message){
        this.setState({
            isValid:false,
            errorMessage:message
        },function(){
            this.props.onStatusChange && this.props.onStatusChange(false);
            this.props.onChange({[this.props.name]:null})
        }.bind(this));
    }
    testIfPasswordIsCorrect(){
        if(this.state.data.password!=this.state.data.confirmedPassword){
            this.setInvalid("Passwords to not match");
            return;
        }

        if(!(/^.{8}.*$/).test(this.state.data.password)){
            this.setInvalid("Must be at least 8 characters");
            return;
        }

        if(!(/\d/).test(this.state.data.password)){
            this.setInvalid("Must be at least 1 number");
            return;
        }

        if(!(/\w/).test(this.state.data.password)){
            this.setInvalid("Must be at least 1 letter");
            return;
        }
        this.setState({
            isValid:true
        },function(){
            this.props.onStatusChange && this.props.onStatusChange(true);
            this.props.onChange({password:this.state.data.password});
        }.bind(this));


    }
    update(data) {
        this.setState({data:$.extend(this.state.data, data)}, function () {
            this.testIfPasswordIsCorrect();
        }.bind(this));
    }
    render(){
        let oldProps=this.props;
        let {type,onChange,placeholder,name, ...props} = oldProps; // Remove type from props
        return <div className="password-container">
                    {this.state.isValid?(<div>
                                        <InputText errorStatus='success' type="password" name="password" placeholder="Create Password" onChange={this.update} {...props}/>
                                        <InputText errorStatus='success' type="password" name="confirmedPassword" placeholder="Confirm Password" onChange={this.update} {...props}/>
                                    </div>
                    ):(<div>
                            <InputText errorStatus='danger' errorMessage={this.state.errorMessage} type="password" name="password" placeholder="Create Password" onChange={this.update} {...props}/>
                            <InputText errorStatus='danger' errorMessage={this.state.errorMessage} type="password" name="confirmedPassword" placeholder="Confirm Password" onChange={this.update} {...props}/>
                       </div>
                        )}
                </div>
    }

}

class EmailInput extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            confirmedPassword:"",
            isValid:false,
            errorMessage:""
        };

        this.update=this.update.bind(this);
    }
    setInvalid(message){
        this.setState({
            isValid:false,
            errorMessage:message
        },function(){
            this.props.onStatusChange && this.props.onStatusChange(false);
            this.props.onChange({email:null})
        }.bind(this));
    }
    testIfDataIsCorrect(){

        if(!(/^[^\@]+\@[^\.]+\.[^\.]+$/).test(this.state.email)){
            this.setInvalid("Email incorrect");
            return;
        }
        this.setState({
            isValid:true
        },function(){
            this.props.onStatusChange && this.props.onStatusChange(true);
            this.props.onChange({email:this.state.email});
        }.bind(this));

    }
    update(data) {
        this.setState($.extend(this.state, data), function () {
            this.testIfDataIsCorrect();
        }.bind(this));
    }
    render(){
        let oldProps=this.props;
        let {type,onChange,placeholder,name, ...props} = oldProps; // Remove type from props
        return <div className="password-container">
            {this.state.isValid?(
            <InputText errorStatus="success" type="email" name="email" placeholder="Email address" onChange={this.update} {...props}/>
                ):(
            <InputText errorStatus="danger" errorMessage={this.state.errorMessage} type="email" name="email" placeholder="Email address" onChange={this.update} {...props}/>
                )}
            </div>
    }

}

class RegisterTextForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
            valid:false,
            file: '',
            previewUrl:''
        };
        this.checkValid=this.checkValid.bind(this);
        this.redirect=this.redirect.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleOnLoad = this.handleOnLoad.bind(this);
    }

    checkValid(isValid){
        this.setState({
            valid:isValid
        });
    }
    redirect(){
        if (this.state.file != '') {
            let data = new FormData();
            data.append('uploadedFile', this.state.file);
            FileResourceAPI.instance.initiate("upload-image", data);
        }
        this.props.router.push("/app/home");
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

    render(){

        return <APIContainer onSubmit={this.redirect} APIListener={UserAPI.instance} Event="register">
                {function(data,change,send,setData,isLoading) {
                    return <div className="form-input">
                        <ProfilePicContainer photo={this.state.previewUrl} editing={true} handleChange={this.handleFileChange}/>
                                <div className="text-form">

                                    <div className="create-login-text">Create a login</div>
                                    <TextInput name="username" placeholder="Username" onChange={change}/>
                                    <TextInput  name="title" placeholder="Title" onChange={change}/>
                                    <TextInput  name="organization" placeholder="Organization" onChange={change}/>
                                    <PasswordInput onStatusChange={this.checkValid}  name="password"  onChange={change} />
                                    <EmailInput onStatusChange={this.checkValid} placeholder="Username" onChange={change}/>
                                    <Footer>
                                        {[{Content:"Register", onClick:send, disabled:!this.state.valid}]}
                                    </Footer>
                                </div>
                            </div>
                }.bind(this)}
            </APIContainer>
    }
}

export default RegisterTextForm