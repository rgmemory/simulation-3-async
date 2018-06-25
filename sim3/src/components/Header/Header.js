import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import './header.css'

export default class Header extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className="header">
                <div className="inner-header">
                
                    <div className="inner-header-left">
                        <p>Helo</p>
                        <Link to="/"><button>Home</button></Link>
                        <Link to="/search"><button>Search</button></Link>
                    </div>

                    <div className="current-page">Current Page</div>

                    <div className="inner-header-right">
                        <Link to="/auth"><button>Logout</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}