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
                Helo
                <Link to="/"><button>Home</button></Link>
                <Link to="/search"><button>Search</button></Link>
                Current Page
                <Link to="/auth"><button>Logout</button></Link>
            </div>
        )
    }
}