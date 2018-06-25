import React, { Component } from 'react';
import Header from './components/Header/Header'
import routes from './routes'
import './App.css';
import {withRouter} from 'react-router';


class App extends Component {
  render() {
    return (
      <div className="App">

      {/* {
        this.props.location.pathname == '/auth' ?
        null
        :
        <Header />
      
      } */}

      <Header />
        
          <div className="background">
            <div className="center">
              {routes}
            </div>
          </div>
      </div>
    );
  }
}

export default App;
