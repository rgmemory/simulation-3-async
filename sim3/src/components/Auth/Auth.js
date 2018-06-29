import React, {Component} from 'react';
import './auth.css'
import {Link} from 'react-router-dom';
import auth from './auth.png'

export default class Auth extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className="auth">
                <div className="auth-login">
                    <div className="auth-login-logo">
                        <div><img src={auth} /></div>
                    </div>
                    <div className="auth-login-title">
                        <p>Helo</p>
                    </div>
                    <div className="auth-login-button">
                        {/* <Link to="/"><button>Login/Register</button></Link> */}
                        <button><a href={process.env.REACT_APP_LOGIN}>LOGIN/REGISTER</a></button>
                    </div>
                </div>
            </div>
        )
    }
}