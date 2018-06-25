import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './dashboard.css'
import axios from 'axios'

export default class Dashboard extends Component{
    constructor(){
        super()

        this.state = {
            first: '',
            last: '',
            gender: '',
            hair: '',
            eye: '',
            hobby: '', 
            day: null,
            month: '',
            year: null
        }


        this.handleFirst = this.handleFirst.bind(this)
        this.handleLast = this.handleLast.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.handleHair = this.handleHair.bind(this)
        this.handleEye = this.handleEye.bind(this)
        this.handleHobby = this.handleHobby.bind(this)
        this.handleDay = this.handleDay.bind(this)
        this.handleMonth = this.handleMonth.bind(this)
        this.handleYear = this.handleYear.bind(this)
        this.getUsers = this.getUsers.bind(this)

    }

    componentDidMount(){
        this.getUsers();
    }


    getUsers(){
        console.log('get users clicked')
        axios.get('/api/getUsers').then(res => {
            console.log(res.data)
        })
    }





    handleFirst(value){
        this.setState({
            first: value
        })
    }
    handleLast(value){
        this.setState({
            last: value
        })
    }
    handleGender(value){
        this.setState({
            gender: value
        })
    }
    
    handleHair(value){
        this.setState({
            hair: value
        })
    }
    
    handleEye(value){
        this.setState({
            eye: value
        })
    }

    handleHobby(value){
        this.setState({
            hobby: value
        })
    }
    handleDay(value){
        this.setState({
            day: value
        })
    }
    handleMonth(value){
        this.setState({
            month: value
        })
    }
    handleYear(value){
        this.setState({
            year: value
        })
    }

    

    render(){
        return(
            <div className="dashboard">

                Dashboard
                <div className="dashboard-top">
                    <div className="dashboard-top-left">
                        <img/>
                        <Link to="/profile"><button>Edit Profile</button></Link>
                    </div>
                    <div className="dashboard-top-right">
                        <p>
                            Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your
                            profile, the better recommendations we can make!
                        </p>
                    </div>
                </div>

                <div className="dashboard-bottom">
                    <div className="dashboard-bottom-top">
                        <p>Recommended Friends</p>
                        <p>Sorted by</p>
                        <select>
                            <option value={this.state.first} onChange={e => this.handleFirst(e.target.value)}>First Name</option>
                            <option value={this.state.last} onChange={e => this.handleLast(e.target.value)}>Last Name</option>
                            <option value={this.state.gender} onChange={e => this.handleGender(e.target.value)}>Gender</option>
                            <option value={this.state.hair} onChange={e => this.handleHair(e.target.value)}>Hair Color</option>
                            <option value={this.state.eye} onChange={e => this.handleEye(e.target.value)}>Eye Color</option>
                            <option value={this.state.hobby} onChange={e => this.handleHobby(e.target.value)}>Hobby</option>
                            <option value={this.state.day} onChange={e => this.handleDay(e.target.value)}>Birth Day</option>
                            <option value={this.state.month} onChange={e => this.handleMonth(e.target.value)}>Birth Month</option>
                            <option value={this.state.year} onChange={e => this.handleYear(e.target.value)}>Birth Year</option>
                            
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}