import React, { Component } from 'react';
import Header from './components/Header/Header'
import routes from './routes'
import './App.css';
import {withRouter} from 'react-router';


///on dashboard why doesn't it consistantly sort stuff why just sometimes and then it stops? I have to click out of dashboard and then back in
//and it will work, particularly after entering dates

//Dashboard The container for recommended friends should have overflow for scrolling large results.

//when adding or removing friends in search, why does it not reload automatically?


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
