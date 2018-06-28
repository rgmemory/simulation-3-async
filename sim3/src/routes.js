import React from 'react'
import {Switch, Route} from 'react-router-dom';

import Auth from './components/Auth/Auth'
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Search from './components/Search/Search'; 

export default(
    <Switch>
        <Route exact path='/' component={Auth} />
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/profile' component={Profile} />
        <Route path='/search' component={Search} />
    </Switch>
)