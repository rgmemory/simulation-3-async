import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Dashboard extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className="dashboard">
                Dashboard
                <Link to="/profile"><button>Edit Profile</button></Link>
            </div>
        )
    }
}