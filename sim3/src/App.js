import React, { Component } from 'react';
import Header from './components/Header/Header'
import routes from './routes'
import './App.css';
import {withRouter} from 'react-router';


//how does a select work? Does it take the literal value in value?
//in order to filter on dahsboard

class App extends Component {
  render() {
    // console.log(this.props)
    return (
      <div className="App">
       
          {/* <div className={`${this.props.location.pathname === '/' ? 'auth-background' : 'background'}`}> */}
          
            {
              this.props.location.pathname === '/' ? 

                <div>
                      {routes}
                </div>
                :

                <div>
                  <Header />
                  <div className="background">
                    <div className="center">
                          {routes}
                    </div>
                  </div>
                </div>
            }  
      </div>
    );
  }
}


///withrouter wraps the router but if it's not in the router you need to export it like so:
export default withRouter(App);