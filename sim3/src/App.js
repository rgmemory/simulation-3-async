import React, { Component } from 'react';
import Header from './components/Header/Header'
import routes from './routes'
import './App.css';
import {withRouter} from 'react-router';


//how to make the dashboard rerender when you add a friend so that friend is no longer recommened

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">

      

      {/* {
        this.props.location.pathname == '/auth' ?
        null
        :
        <Header />
      
      } */}

      <Header />
        
          {/* <div className="background"> */}
          <div className={`${this.props.location.pathname === '/' ? 'auth-background' : 'background'}`}>
            <div className="center">
            {/* <div className={`${this.props.location.pathname === '/' ? 'auth-center' : 'center'}`}> */}
              {routes}
            </div>
          </div>
      </div>
    );
  }
}


///withrouter wraps the router but if it's not in the router you need to export it like so:
export default withRouter(App);
