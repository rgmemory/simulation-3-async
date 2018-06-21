import React, {Component} from 'react';
import './profile.css'

export default class Profile extends Component{
    constructor(){
        super()

    }

    render(){
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
                            <button>Update</button>
                            <button>Cancel</button>
                        </div>
                </div>

                <div className="profile-bottom">
                    <div className="profile-inner-bottom">
                        <div className="profile-inner-bottom-left">
                            <p>First Name</p>
                            <input type="text"/>

                            <p>Last Name</p>
                            <input type="text"/>
                            
                            <p>Gender</p>
                            <select name="gender" value=''>
                                <option>Male</option>
                                <option>Female</option>
                            </select>

                            <p>Hair Color</p>
                            <select name="hair" value=''>
                                <option>Brown</option>
                                <option>Blonde</option>
                                <option>Red</option>
                                <option>Black</option>
                            </select>

                            <p>Eye Color</p>
                            <select name="eye" value=''>
                                <option>Blue</option>
                                <option>Brown</option>
                                <option>Green</option>
                                <option>Hazel</option>
                            </select>

                        </div>
                        <div className="profile-inner-bottom-right">
                            <p>Hobby</p>
                            <select name="hobby" value=''>
                                <option>Reading</option>
                                <option>Biking</option>
                                <option>Movies</option>
                                <option>Video Games</option>
                                <option>Instruments</option>
                            </select>


                            <p>Birthday Day</p>
                            <select name="day" value=''>
                                <option value='01'>01</option>
                                <option value='02'>02</option>
                                <option value='03'>03</option>
                                <option value='04'>04</option>
                                <option value='05'>05</option>
                                <option value='06'>06</option>
                                <option value='07'>07</option>
                                <option value='08'>08</option>
                                <option value='09'>09</option>
                                <option value='10'>10</option>
                                <option value='11'>11</option>
                                <option value='12'>12</option>
                                <option value='13'>13</option>
                                <option value='14'>14</option>
                                <option value='15'>15</option>
                                <option value='16'>16</option>
                                <option value='17'>17</option>
                                <option value='18'>18</option>
                                <option value='19'>19</option>
                                <option value='20'>20</option>
                                <option value='21'>21</option>
                                <option value='22'>22</option>
                                <option value='23'>23</option>
                                <option value='24'>24</option>
                                <option value='25'>25</option>
                                <option value='26'>26</option>
                                <option value='27'>27</option>
                                <option value='28'>28</option>
                                <option value='29'>29</option>
                                <option value='30'>30</option>
                                <option value='31'>31</option>
                            </select>

                            <p>Birthday Month</p>
                            <select name="month" value=''>
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
                            <select name="year" value=''>
                                <option value='01'>2004</option>
                                <option value='02'>2003</option>
                                <option value='03'>2002</option>
                                <option value='04'>2001</option>
                                <option value='05'>2000</option>
                                <option value='06'>1999</option>
                                <option value='07'>1998</option>
                                <option value='08'>1997</option>
                                <option value='09'>1996</option>
                                <option value='10'>1995</option>
                                <option value='11'>1994</option>
                                <option value='12'>1993</option>
                            </select>
                        </div>
                    </div>

                </div>

                
            </div>
        )
    }
}