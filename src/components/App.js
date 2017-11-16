import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import FirstBlock from './FirstBlock';
import ThirdBlock from './ThirdBlock';


class App extends Component {
  constructor(){
    super();
    this.state = {
      headerText: 'header text',
      testsCompleted: [],
      testList:["SD card test", "Serialization", "Video Test", "Audio Test", "Switch Test", "LEDs Test",
        "Buzzer/Vibrator Test", "Battery & Charger Test"],
      currentTestIndex:0
    }
  }


   // TIMER FUNCTIONS
   
  render() {
    return (
      <div className="App">
       
        <header className="App-header">
            TEST TOOL
        </header>
        <first_block>
          <FirstBlock  {...this.state} />
        </first_block>
        <third_block>
          <ThirdBlock  {...this.state} />
        </third_block>
       
      </div>
    );
  }
}

export default App;
