import React, {Component} from 'react';
import './auth.css'
import {Link} from 'react-router-dom';

export default class Auth extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className="auth">
            Auth
                <div className="auth-login">
                    <div className="auth-login-logo">
                        Logo
                    </div>
                    <div className="auth-login-title">
                        Helo
                    </div>
                    <div className="auth-login-button">
                        {/* <Link to="/"><button>Login/Register</button></Link> */}
                        <a href={process.env.REACT_APP_LOGIN}>LOGIN</a>
                    </div>
                </div>
            </div>
        )
    }
}