import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';


class App extends Component {
  constructor(){
    super();
    this.state = {
      headerText: 'header text'
    }

  }

  render() {
    return (
      <div className="App">
       
        <header className="App-header">
            JS TEST TOOL
        </header>
        <Home  {...this.state} />
      </div>
    );
  }
}

export default App;
