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
            search: '',
            value: 2,
            count: null,
            buttons: [],
            firstOrLast: ''
            // pageNumber: 1;
        }

        this.updateSearch = this.updateSearch.bind(this);
        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);
        this.addFriend = this.addFriend.bind(this);
        this.removeFriend = this.removeFriend.bind(this);
        this.displayPage = this.displayPage.bind(this);
        this.firstOrLast = this.firstOrLast.bind(this);
    }

    componentDidMount(){           

        //load the buttons
        axios.get('/api/numberusers').then(res => {
            // console.log('front end users number', res.data.count)
            this.setState({
                count: res.data.count
            })
            // console.log('this.state.count', this.state.count)
            let numberOfButtons = Math.ceil(this.state.count / 8);
            // console.log('number of buttons', numberOfButtons)
            let buttons = [];
            for(let i = 2; i < numberOfButtons + 1; i++ ){
                buttons.push(i)
            }
            this.setState({
                buttons: buttons
            })
            console.log('buttons', this.state.buttons)
        })
        
        //load the users
        axios.post('/api/displaypages', {page: 1}).then(res => {
            console.log('front end display page', res.data)
            this.setState({
                users: res.data
            })
        })
        
    }
    
    //updates state after the value has been input
    updateSearch(value){
        console.log(value);
        this.setState({
            search: value
        })
    }

    //selects if it will be searching for first or last name
    firstOrLast(value){
        console.log('firstOrLast', value);
        this.setState({
            firstOrLast: value
        })
    }
    
    //clicking the search button
    search(){
        console.log('search clicked')
        axios.post('/api/search', {firstOrLast: this.state.firstOrLast, name: this.state.search}).then(res => {
            console.log('search front end reply', res)
        })
    }

    //clicking the reset button
    reset(){
        console.log('reset clicked')
    }

    //add a friend
    addFriend(value){
        console.log('add friend clicked', value)

        axios.post('/api/searchAddFriend', {id: value}).then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    //remove a friend
    removeFriend(value){
        console.log('remove friend')

        axios.post('/api/removeFriend', {id: value}).then(res => {
            console.log('front end remove', res.data)
            this.setState({
                users: res.data
            })
        })
    }

    //click on the individual page and display the information
    displayPage(value){
        console.log('display page clicked', value)
        axios.post('/api/displaypages', {page: value}).then(res => {
            console.log('front end display page', res.data)
            this.setState({
                users: res.data
            })
        })
    }

    render(){

        let page = this.state.buttons.map((current, index) => {
            return(
                <div className="page">
                    <button onClick={() => {this.displayPage(current)}}>{current}</button>
                </div>
            )
        })

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
                    {
                        current.friendship == true ?
                        <div className="remove-friend">
                            <button onClick={() => {this.removeFriend(current.id)}}>Remove Friend</button>
                        </div>
                        :
                        <div className="add-friend">
                            <button onClick={() => {this.addFriend(current.id)}}>Add Friend</button>
                        </div>
                    }
                    </div>
                </div>
            )
        })

        return(
            <div className="search">
                <div className="search-top">

                    <div><select value={this.state.firstOrLast} onChange={e => this.firstOrLast(e.target.value)}>
                        <option value='first'>First Name</option>
                        <option value='last'>Last Name</option>
                    </select></div>

                    <div><input type="text" onChange={e => this.updateSearch(e.target.value)}/></div>
                    <div className="profile-update"><button onClick={this.search}>Search</button></div>
                    <div className="profile-cancel"><button onClick={this.reset}>Reset</button></div>
                </div>

                <div className="search-bottom">
                    {displayUsers}
                </div>

                <div className="pagination">
                    <div className="inner-pagination">
                        <div className="pagination-pages">
                            <div className="page-one">
                                <button onClick={() => this.displayPage(1)}>Page 1</button>
                            </div>
                            <div className="pages">
                                {page}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}