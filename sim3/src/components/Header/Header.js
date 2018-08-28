import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './header.css'
import Home from './Home.png'
import Magnify from './Magnify.png'
import axios from 'axios'
import {withRouter} from 'react-router'

class Header extends Component{
    constructor(){
        super()

    }


    render(){

        let location = ''

        if(this.props.location.pathname === '/dashboard'){
            location = 'dashboard'
        }

        return(
            <div className="header">
                <div className="inner-header">

                    <div className="inner-header-left">
                    {/* 54C-1	 */}
                    {/* 54C-2	 */}
                        <span><p>Helo</p></span>
                        <div><Link to="/dashboard"><img src={Home}/></Link></div>
                        <div><Link to="/search"><img src={Magnify}/></Link></div>
                    </div>

                    {
                        
                    }

                    {/* <div className="current-page">{`${this.props.location.pathname === '/dashboard' ? 'Dashboard' : 'Nope'}`}</div> */}
                    <div className="current-page">{location}</div>

                    {/* 54C-3	 */}
                    <div className="inner-header-right">
                        <a href={process.env.REACT_APP_LOGOUT}>LOGOUT</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)