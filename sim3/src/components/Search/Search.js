import React, {Component} from 'react';
import './search.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

export default class Search extends Component{
    constructor(){
        super()

        this.state = {
            users: [],
            first: '',
            last: '',
            search: ''
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);
        this.addFriend = this.addFriend.bind(this);
    }

    componentDidMount(){
        axios.get('/api/user/list').then(res => {
            console.log(res.data)
            this.setState({
                users: res.data
            })
        })
    }

    updateSearch(value){
        console.log(value);
        this.setState({
            search: value
        })
    }

    search(){
        console.log('search clicked')
    }

    reset(){
        console.log('reset clicked')
    }

    addFriend(){
        console.log('add friend clicked')
    }

    render(){

        let displayUsers = this.state.users.map((current, index) => {
            return(
                <div key={current + index}className="search-user">
                    <div className="search-user-left">
                        <img src={current.image} />
                    </div>
                    <div className="search-user-center">
                        <div><b>{current.first}</b></div>
                        <div><b>{current.last}</b></div>
                    </div>
                    <div className="search-user-right">
                        <div className="add-friend">
                            <button onClick={this.addFriend}>Add Friend</button>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            <div className="search">
                <div className="search-top">

                    <div><select >
                        <option value={this.state.first}>First Name</option>
                        <option value={this.state.last}>Last Name</option>
                    </select></div>

                    <div><input type="text" onChange={e => this.updateSearch(e.target.value)}/></div>
                    <div className="profile-update"><button onClick={this.search}>Search</button></div>
                    <div className="profile-cancel"><button onClick={this.reset}>Reset</button></div>
                </div>

                <div className="search-bottom">
                    {displayUsers}
                </div>
            </div>
        )
    }
}