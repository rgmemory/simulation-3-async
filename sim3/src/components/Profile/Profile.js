import React, {Component} from 'react';
import './profile.css'
import axios from 'axios'
import {Link} from 'react-router-dom';

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
            day: 0,
            month: '',
            year: 0,
            image: ''
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
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount(){
      
        axios.get('api/getDashUser').then(user => {
            console.log('user', user)

            let {first, last, gender, hair, eye, hobby, day, month, year, image} = user.data;
            this.setState({
                first, last, gender, hair, eye, hobby, day, month, year, image
            })
            console.log('this.state.first', this.state.first)
            console.log('this.state.image', this.state.image)
        })
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
        
        let {first, last, gender, hair, eye, hobby, day, month, year} = this.state
        console.log('update clicked', first, last, gender, hair, eye, hobby, day, month, year)
        axios.post('/api/updateProfile', {first, last, gender, hair, eye, hobby, day, month, year}).then(res => {
            console.log('new deets', res.data)
        })
    }

    cancel(){
        axios.get('api/getDashUser').then(user => {
            let {first, last, gender, hair, eye, hobby, day, month, year, image} = user.data;
            this.setState({
                first, last, gender, hair, eye, hobby, day, month, year, image
            })
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

                        <div className="profile-top-left">
                        
                            <div className="profile-top-image">
                                <img src={this.state.image}></img>
                            </div>
                            <div className="profile-top-name">
                                <div><b>{this.state.first}</b></div>
                                <div><b>{this.state.last}</b></div>
                            </div>
                        </div>

                        <div className="profile-top-right">
                        
                            <div className="profile-update"><Link to="/dashboard"><button onClick={this.update}>Update</button></Link></div>
                            <div className="profile-cancel"><Link to="/dashboard"><button onClick={this.cancel}>Cancel</button></Link></div>
                        </div>
                </div>

                <div className="profile-bottom">
                    <div className="profile-inner-bottom">
                        <div className="profile-inner-bottom-left">
                            <div>First Name</div>
                            <input value={this.state.first} onChange={e => this.firstInput(e.target.value)} type="text"/>

                            <div>Last Name</div>
                            <input value={this.state.last} onChange={e => this.lastInput(e.target.value)} type="text"/>
                            
                            <div>Gender</div>
                            <select name="gender" value={this.state.gender} onChange={e => this.handleGender(e.target.value)}>
                                <option value="male" >Male</option>
                                <option value="female" >Female</option>
                            </select>

                            <div>Hair Color</div>
                            <select name="hair" value={this.state.hair} onChange={e => this.handleHair(e.target.value)}>
                                <option value="brown">Brown</option>
                                <option value='blonde'>Blonde</option>
                                <option value='red'>Red</option>
                                <option value='black'>Black</option>
                            </select>

                            <div>Eye Color</div>
                            <select name="eye" value={this.state.eye} onChange={e => this.handleEye(e.target.value)}>
                                <option value='blue'>Blue</option>
                                <option value='brown'>Brown</option>
                                <option value='green'>Green</option>
                                <option value='hazel'>Hazel</option>
                            </select>

                        </div>
                        <div className="profile-inner-bottom-right">
                            <div>Hobby</div>
                            <select name="hobby" value={this.state.hobby} onChange={e => this.handleHobby(e.target.value)}>
                                <option value='Reading'>Reading</option>
                                <option value='Biking'>Biking</option>
                                <option value='Movies'>Movies</option>
                                <option value='Video Games'>Video Games</option>
                                <option value='Instruments'>Instruments</option>
                            </select>


                            <div>Birthday Day</div>
                            <select name="day" value={this.state.day} onChange={e => {this.handleDay(e.target.value)}}>
                                {days}
                            </select>

                            <div>Birthday Month</div>
                            <select name="month" value={this.state.month} onChange={e => this.handleMonth(e.target.value)}>
                                <option value='fanuary'>January</option>
                                <option value='february'>February</option>
                                <option value='march'>March</option>
                                <option value='april'>April</option>
                                <option value='May'>May</option>
                                <option value='june'>June</option>
                                <option value='july'>July</option>
                                <option value='august'>August</option>
                                <option value='september'>September</option>
                                <option value='october'>October</option>
                                <option value='november'>November</option>
                                <option value='december'>December</option>
                            </select>

                            <div>Birthday Year</div>
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