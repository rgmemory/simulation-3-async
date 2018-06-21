import React, {Component} from 'react';
import './search.css'

export default class Search extends Component{
    constructor(){
        super()

    }

    render(){
        return(
            <div className="search">
                <div className="search-top">
                    <input type="text" />
                    <button>Search</button>
                    <button>Reset</button>
                </div>
                <div className="search-bottom">
                </div>
            </div>
        )
    }
}