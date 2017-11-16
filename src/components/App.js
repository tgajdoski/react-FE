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
      currentTestIndex: null
    }

    
  }

  cLog = () => {
    console.log("VO CALLBACK");
    console.log(this.state.currentTestIndex);
    console.log("testsCompleted : " + this.state.testsCompleted);
  }

  StartTest = () => {
    console.log("ME POVIKAA");
    this.setState({currentTestIndex: 0}, this.cLog);
  }

  CompleteTest = (index) => {
    console.log("ME POVIKAA : " + this.state.testList[index] );
      debugger;

      let a = this.state.testsCompleted.slice(); //creates the clone of the state
      a[index] = this.state.testList[index];
      this.setState({testsCompleted: a}, this.cLog);
  }
  
   
  render() {
    return (
      <div className="App">
        <div className = "container" >
          <header className="App-header">
              TEST TOOL
          </header>
            <FirstBlock 
              StartTest = {this.StartTest}
              CompleteTest = {this.CompleteTest}
              {...this.state} 
            />
          <ThirdBlock  {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
