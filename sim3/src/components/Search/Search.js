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
            firstOrLast: 'first',
            displayUsers: [],
            pageNumber: 1
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
        ////why isn't this automatically updating? Why do I need to refresh?
        axios.get('/api/searchDisplay').then(res => {
            console.log('search did mount', res.data)
            let tempDisplayArray = [];

            for(let i = 0; i < 8; i++){
                tempDisplayArray.push(res.data[i])
            }
            
            let numberOfButtons = Math.ceil(res.data.length / 8);

            let buttons = [];

            for(let i = 2; i < numberOfButtons + 1; i++ ){
                buttons.push(i)
            }

            this.setState({
                buttons: buttons,
                // users: res.data,
                displayUsers: tempDisplayArray
            })
        })
    }
    
    //updates state after the value has been input
    updateSearch(value){
        // console.log(value);
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
    /////////////////still working
    search(){
            axios.get('/api/searchDisplay').then(res => {
                console.log('search clicked', res.data, this.state.firstOrLast, this.state.search)

                let filterArray = [];

                if(this.state.firstOrLast == 'first'){
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].first == this.state.search){
                            console.log(res.data[i], 'info')
                            filterArray.push(res.data[i])
                        }
                    }
                }else{
                    for(let i = 0; i < res.data.length; i++){
                        if(res.data[i].last == this.state.search){
                            console.log(res.data[i], 'info')
                            filterArray.push(res.data[i])
                        }
                    }
                }

                
                if(filterArray.length >=8){

                    let tempDisplayArray = [];
                    
                    for(let i = 0; i < 8; i++){
                        tempDisplayArray.push(filterArray[i])
                    }
                    
                    filterArray = tempDisplayArray;
                    
                    console.log('over 8', filterArray.length)

                    let numberOfButtons = Math.ceil(filterArray.length / 8);
                    console.log('numberOfButtons', numberOfButtons)
    
                    let buttons = [];
        
                    for(let i = 2; i < numberOfButtons + 1; i++ ){
                        buttons.push(i)
                    }

                    this.setState({
                        buttons: buttons,
                        displayUsers: filterArray
                    })

                }else{
                    let numberOfButtons = Math.ceil(filterArray.length / 8);
                    console.log('numberOfButtons', numberOfButtons)
                    
                    
                    let buttons = [];
                    console.log('under 8', filterArray.length)
        
                    for(let i = 2; i < numberOfButtons + 1; i++ ){
                        buttons.push(i)
                    }

                    this.setState({
                        buttons: buttons,
                        displayUsers: filterArray
                    })
                }


                
                
    
                // this.setState({
                //     buttons: buttons,
                //     displayUsers: filterArray
                // })
            })
    }

    //clicking the reset button

    reset(){
        console.log('reset clicked')

        axios.get('/api/searchDisplay').then(res => {
            let tempDisplayArray = [];

            for(let i = 0; i < 8; i++){
                tempDisplayArray.push(res.data[i])
            }
            
            let numberOfButtons = Math.ceil(res.data.length / 8);

            let buttons = [];

            for(let i = 2; i < numberOfButtons + 1; i++ ){
                buttons.push(i)
            }

            this.setState({
                buttons: buttons,
                users: res.data,
                displayUsers: tempDisplayArray
            })
        })
    }

    //add a friend
    addFriend(value){
        axios.post('/api/searchAddFriend', {id: value}).then(res => {
            axios.get('/api/searchDisplay').then(res => {
                let tempDisplayArray = [];
    
                for(let i = 0; i < 8; i++){
                    tempDisplayArray.push(res.data[i])
                }
                
                let numberOfButtons = Math.ceil(res.data.length / 8);
    
                let buttons = [];
    
                for(let i = 2; i < numberOfButtons + 1; i++ ){
                    buttons.push(i)
                }
    
                this.setState({
                    buttons: buttons,
                    displayUsers: tempDisplayArray
                })
            })
        })
    }

    //remove a friend
    removeFriend(value){
        axios.post('/api/removeFriend', {id: value}).then(res => {
            axios.get('/api/searchDisplay').then(res => {
                let tempDisplayArray = [];
    
                for(let i = 0; i < 8; i++){
                    tempDisplayArray.push(res.data[i])
                }
                
                let numberOfButtons = Math.ceil(res.data.length / 8);
    
                let buttons = [];
    
                for(let i = 2; i < numberOfButtons + 1; i++ ){
                    buttons.push(i)
                }
    
                this.setState({
                    buttons: buttons,
                    displayUsers: tempDisplayArray
                })
            })
        })
    }

    //click on the individual page and display the information
    displayPage(value){
        console.log('display page clicked', value, 'users are', this.state.users)
        console.log('first', value)

        let tempArray = [];

        for(var i = ((value - 1)  * 8); i < (value * 8); i++){
            if(i < this.state.users.length){
                console.log(i);
                tempArray.push(this.state.users[i]);
                console.log('temparray', tempArray)
            }
        }
        console.log('final temp array', tempArray)

        this.setState({
            displayUsers: tempArray
            
        })
    }

    render(){

        let page = this.state.buttons.map((current, index) => {
            return(
                <div className="page" key={current + index}>
                    <button onClick={() => {this.displayPage(current)}}>{current}</button>
                </div>
            )
        })

        let displayUsers = this.state.displayUsers.map((current, index) => {
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