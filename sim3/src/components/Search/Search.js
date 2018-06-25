import React, {Component} from 'react';
import './search.css'
import axios from 'axios'

export default class Search extends Component{
    constructor(){
        super()

        this.state = {
            users: [],
            first: '',
            last: ''
        }
    }

    componentDidMount(){
        axios.get('/api/user/list').then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            })
        })
    }

    render(){

        let displayUsers = this.state.users.map(current => {
            return(
                <div key={current + 20}className="search-user">
                    <div className="search-user-left">
                        <img src={current.image} />
                    </div>
                    <div className="search-user-center">
                        <p>{current.first}</p>
                        <p>{current.last}</p>
                    </div>
                    <div className="search-user-right">
                        <button>Add Friend</button>
                    </div>
                </div>
            )
        })

        return(
            <div className="search">
                <div className="search-top">

                    <select >
                        <option value={this.state.first}>First Name</option>
                        <option value={this.state.last}>Last Name</option>
                    </select>

                    <input type="text" />
                    <button>Search</button>
                    <button>Reset</button>
                </div>
                <div className="search-bottom">
                    {displayUsers}
                </div>
            </div>
        )
    }
}