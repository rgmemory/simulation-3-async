import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './header.css'
import Home from './Home.png'
import Magnify from './Magnify.png'
import axios from 'axios'

export default class Header extends Component{
    constructor(){
        super()

    }


    render(){
        return(
            <div className="header">
                <div className="inner-header">
                
                    <div className="inner-header-left">
                        <div><p>Helo</p></div>
                        <div><Link to="/dashboard"><img src={Home}/></Link></div>
                        <div><Link to="/search"><img src={Magnify}/></Link></div>
                    </div>

                    <div className="current-page">Current Page</div>

                    <div className="inner-header-right">
                        {/* <div><Link to="/auth"><button onClick={this.logout}>Logout</button></Link></div> */}
                        <a href={process.env.REACT_APP_LOGOUT}>LOGOUT</a>
                    </div>
                </div>
            </div>
        )
    }
}