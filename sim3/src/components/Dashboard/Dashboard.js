import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css'
import axios from 'axios'
import Header from '../Header/Header'

export default class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            sort: '',
            users: [],
            user: []
        }

        this.addFriend = this.addFriend.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }
    
    componentDidMount(){
        axios.get('/api/getDashboard').then(res => {
            this.setState({
                users: res.data
            })            
        })
        
        axios.get('api/getDashUser').then(user => {
            this.setState({
                user: user.data
            })
        })       
    }
    
    addFriend(value){
        axios.post('/api/addFriend', {id: value}).then(res => {
            this.setState({
                users: res.data
            })
        })
    }

    handleSort(value){
        console.log('value', value);

        this.setState({
            sort: value
        })

        let userValue = this.state.user[value];

        var filteredUsers = this.state.users.filter(current => {
            return (current[value] == userValue);
        })

        console.log('filteredusers', filteredUsers)

        this.setState({
            users: filteredUsers
        })

        console.log('users are', this.state.users)
        console.log('user is', this.state.user[value])
    }
    
    render(){
        
        let dashboardUsers = this.state.users.map((current, index) => {
            return(
                <div key={current + index} className="dashboard-user">
                    <div className="dashboard-user-left">
                        <img src={current.image} />
                    </div>
                    <div className="dashboard-user-center">
                        <div><b>{current.first}</b></div>
                        <div><b>{current.last}</b></div>
                    </div>
                    <div className="dashboard-user-right">
                        <div className="add-friend">
                            <button onClick={() => {this.addFriend(current.id)}}>Add Friend</button>
                        </div>
                    </div>
                </div>
            )
        })

        return(
            
            <div className="dashboard">
            
                <div className="dashboard-top">

                    <div className="dashboard-top-left">

                        <div className="dashboard-top-left-image">
                            <img src={this.state.user.image}/>
                        </div>

                        <div className="dashboard-top-left-name-button">
                            <div className="dashboard-name">
                                <div><b>{this.state.user.first}</b></div>
                                <div><b>{this.state.user.last}</b></div>
                            </div>
                            <div className="dashboard-edit-button">
                                <Link to="/profile"><button>Edit Profile</button></Link>
                            </div>
                        </div>

                    </div>

                    <div className="dashboard-top-right">
                        <div>
                            Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your
                            profile, the better recommendations we can make!
                        </div>
                    </div>
                </div>

                <div className="dashboard-bottom">
                    <div className="dashboard-bottom-top">
                        <div className="dashboard-recommended">
                                <p>Recommended Friends</p>
                            <div className="dashboard-right">
                                <p>Sorted by</p>

                                    <select name="sort" value={this.state.sort} onChange={e => this.handleSort(e.target.value)}>
                                        <option value='first' >First Name</option>
                                        <option value='last' >Last Name</option>
                                        <option value='gender' >Gender</option>
                                        <option value='hair' >Hair Color</option>
                                        <option value='eye' >Eye Color</option>
                                        <option value='hobby' >Hobby</option>
                                        <option value='day' >Birth Day</option>
                                        <option value='month' >Birth Month</option>
                                        <option value='year' >Birth Year</option>                                        
                                    </select>
                            </div>
                        </div>
                        
                        {
                            this.state.users.length == 0 ?

                            <div className="dashboard-no-recommendations"><p>No recommendations</p></div>
                            :
                            <div className="display-users">{dashboardUsers}</div>
                        }

                    </div>
                </div>
            </div>
        )
    }
}