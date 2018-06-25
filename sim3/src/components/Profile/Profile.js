import React, {Component} from 'react';
import './profile.css'
import axios from 'axios'

export default class Profile extends Component{
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

        this.firstInput = this.firstInput.bind(this)
        this.lastInput = this.lastInput.bind(this)
        this.update = this.update.bind(this)
        this.handleGender = this.handleGender.bind(this)
        this.handleHair = this.handleHair.bind(this)
        this.handleEye = this.handleEye.bind(this)
        this.handleHobby = this.handleHobby.bind(this)
        this.handleDay = this.handleDay.bind(this)
        this.handleMonth = this.handleMonth.bind(this)
        this.handleYear = this.handleYear.bind(this)
    }

    firstInput(value){
        this.setState({
            first: value
        })
    }

    lastInput(value){
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

    update(){
        console.log('update clicked')

        let {first, last, gender, hair, eye, hobby, day, month, year} = this.state
        axios.post('/api/friend/add', {first, last, gender, hair, eye, hobby, day, month, year}).then(res => {
            console.log('front end friend works')
        })
    }

    render(){

        let days = []
        for(var i = 1; i < 32; i++){
            days.push(<option key={i + 10} value={i}>{i}</option>)
        }

        let years = []
        for(var i = 2008; i > 1908; i--){
            years.push(<option key={i + 11}value={i}>{i}</option>)
        }

        return(
            <div className="profile">
                <div className="profile-top">
                Profile
                        <div className="profile-top-left">
                            <img></img>
                        </div>
                        <div className="profile-top-center">
                            <div></div>
                        </div>
                        <div className="profile-top-right">
                            <button onClick={this.update}>Update</button>
                            <button>Cancel</button>
                        </div>
                </div>

                <div className="profile-bottom">
                    <div className="profile-inner-bottom">
                        <div className="profile-inner-bottom-left">
                            <p>First Name</p>
                            <input onChange={e => this.firstInput(e.target.value)} type="text"/>

                            <p>Last Name</p>
                            <input onChange={e => this.lastInput(e.target.value)} type="text"/>
                            
                            <p>Gender</p>
                            <select name="gender" value={this.state.gender} onChange={e => this.handleGender(e.target.value)}>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <p>Hair Color</p>
                            <select name="hair" value={this.state.hair} onChange={e => this.handleHair(e.target.value)}>
                                <option>Brown</option>
                                <option>Blonde</option>
                                <option>Red</option>
                                <option>Black</option>
                            </select>

                            <p>Eye Color</p>
                            <select name="eye" value={this.state.eye} onChange={e => this.handleEye(e.target.value)}>
                                <option>Blue</option>
                                <option>Brown</option>
                                <option>Green</option>
                                <option>Hazel</option>
                            </select>

                        </div>
                        <div className="profile-inner-bottom-right">
                            <p>Hobby</p>
                            <select name="hobby" value={this.state.hobby} onChange={e => this.handleHobby(e.target.value)}>
                                <option>Reading</option>
                                <option>Biking</option>
                                <option>Movies</option>
                                <option>Video Games</option>
                                <option>Instruments</option>
                            </select>


                            <p>Birthday Day</p>
                            <select name="day" value={this.state.day} onChange={e => {this.handleDay(e.target.value)}}>
                                {days}
                            </select>

                            <p>Birthday Month</p>
                            <select name="month" value={this.state.month} onChange={e => this.handleMonth(e.target.value)}>
                                <option value='01'>January</option>
                                <option value='02'>February</option>
                                <option value='03'>March</option>
                                <option value='04'>April</option>
                                <option value='05'>May</option>
                                <option value='06'>June</option>
                                <option value='07'>July</option>
                                <option value='08'>August</option>
                                <option value='09'>September</option>
                                <option value='10'>October</option>
                                <option value='11'>November</option>
                                <option value='12'>December</option>
                            </select>

                            <p>Birthday Year</p>
                            <select name="year" value={this.state.year} onChange={e => this.handleYear(e.target.value)}>
                                {years}
                            </select>
                        </div>
                    </div>

                </div>

                
            </div>
        )
    }
}