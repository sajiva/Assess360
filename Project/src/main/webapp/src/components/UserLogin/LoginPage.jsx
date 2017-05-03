import React from "react";
import Rests from "../../libaries/Rest.jsx";
import UserAPI from "../../libaries/APIs/UserAPI.jsx";
import $ from 'jquery';
import {Action} from 'react-router';
import PageContent from 'components/Template/PageContent.jsx';

/**
 * @description Get user input from a form component for username and password
 * @this GetUserInput
 */
class GetUserInput extends React.Component {
    /**
   * @description constructor
   * @param {object} props
   */
    constructor(props) {
        /**
         * @type {object}
         * @property {string} username user input username
         * @property {string} password user input password
         * @property {boolean} init inital state of user input
         */

        super(props);
        this.state = {
            username: '',
            password: '',
            init: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    /**
    * @description handle change event at input form
    * @param {SytheticEvent} e
    */
    handleChange(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });

    }
    /**
    * @description handle submit event at input form
    * @param {SytheticEvent} e
    */
    handleSubmit(e) {
        const $this = this;

        /**
         * @property {boolean} failed fail state of signing in process
         * @property {boolean} loading loading state of signing in process
         * @property {boolean} init successfull login state of signing in process
         */
        $this.setState({
            failed: false,
            loading: true,
            message: "Signing In"
        });
        /**
        * @description update the state of username and password
        * @const {object} loginData
        * @param {string} username
        * @param {string} password
        */
        const loginData = {
            username: this.state.username,
            password: this.state.password
        };


        UserAPI.instance.login(this.state.username, this.state.password, function (data) {

            if (data.data.success) {
                window.location = "/app/home";
                return;
            }
            $this.setState({
                failed: true,
                loading: false,
                message: data.message,
                init: false
            });
        });


    }

    /**
     * @description render
     * @return {ReactElement} markup
     */

    render() {
        return (<div className="login-form">

                    <div>
                        <label className="username-label text-left"><b>Username: </b></label>
                        <input className="username-input " placeholder='Enter username' name="username" type="text"
                               value={this.state.username} onChange={this.handleChange} autoFocus required/>
                        <br/>
                        <label className="password-label text-left"><b>Password: </b></label>
                        <input className="password-input" name="password" placeholder='Enter password'
                               type="password" value={this.state.password} onChange={this.handleChange} required/>
                        <br/>
                        {(this.state.failed ?
                            (<div className="failed-login">
                                <h4 className="text-danger">{this.state.message}</h4>
                            </div>) : "")}
                        {(this.state.loading ?
                            (<div className="failed-login">
                                <h4 className="text-info">{this.state.message}</h4>
                            </div>) : "")}

                        <button type="submit" className="login-button text-left" onClick={this.handleSubmit}>Login
                        </button>
                    </div></div>

        )
    }
}

export default GetUserInput;
