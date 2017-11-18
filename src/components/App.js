import React, { Component } from 'react';
//import logo from '../images/logo.svg';
import '../css/App.css';
import FirstBlock from './FirstBlock';
import SecondBlock from './SecondBlock';
import ThirdBlock from './ThirdBlock';
import axios from 'axios';
import initState from './initState';

class App extends Component {
  constructor(){
    super();
    this.state = {
      headerText: 'header text',
      testsCompleted: [],
      testList:["SD card test", "Serialization", "Video Test", "Audio Test", "Switch Test", "LEDs Test",
        "Buzzer/Vibrator Test", "Battery & Charger Test"],
      currentTestIndex: null,
      testResponses: initState.ininData
    }

    
  }

  cLog = () => {
    console.log("VO CALLBACK");
    console.log(this.state.currentTestIndex);
    console.log("testsCompleted : " + this.state.testsCompleted);
    console.log("testResponses : " + JSON.stringify(this.state.testResponses));
  }




  formatDate(dateObj,format) {
    // var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
     var curr_date = dateObj.getDate();
     var curr_month = dateObj.getMonth();
     curr_month = curr_month + 1;
     var curr_year = dateObj.getFullYear();
     var curr_min = dateObj.getMinutes();
     var curr_hr= dateObj.getHours();
     var curr_sc= dateObj.getSeconds();
     if(curr_month.toString().length === 1)
     curr_month = '0' + curr_month;      
     if(curr_date.toString().length === 1)
     curr_date = '0' + curr_date;
     if(curr_hr.toString().length === 1)
     curr_hr = '0' + curr_hr;
     if(curr_min.toString().length === 1)
     curr_min = '0' + curr_min;
 
     if(format===1)//dd-mm-yyyy
     {
         return curr_date + "-"+curr_month+ "-"+curr_year;       
     }
     else if(format===2)//yyyy-mm-dd
     {
         return curr_year + "-"+curr_month+ "-"+curr_date;       
     }
     else if(format===3)//dd/mm/yyyy
     {
         return curr_date + "/"+curr_month+ "/"+curr_year;       
     }
     else if(format===4)// MM/dd/yyyy HH:mm:ss
     {
         return curr_month+"/"+curr_date +"/"+curr_year+ " "+curr_hr+":"+curr_min+":"+curr_sc;       
     }
     else if(format===5)// MM/dd/yyyy HH:mm:ss
     {
         return curr_hr+":"+curr_min+":"+curr_sc;       
     }
 }
  

  CatchTestResponse = (index, response, passed) => {
    let a = this.state.testResponses.slice(); //creates the clone of the state
    let d = new Date();

    let tempRecord = {
      "testindex": this.state.currentTestIndex,
      "testname": this.state.testList[this.state.currentTestIndex],
      "response": response.data, 
      "passed" : passed,
      "datetime" : this.formatDate(d,5)
    };
    a[index] = tempRecord;

    this.setState({testResponses: a}, this.cLog);
  }

  CompleteTest = (index) => {
      let a = this.state.testsCompleted.slice(); //creates the clone of the state
      a[index] = this.state.testList[index];
      this.setState({testsCompleted: a, currentTestIndex: this.state.currentTestIndex + 1 }, this.cLog);
  }
  
  StartTest = (index) => {
    console.log("STARTING TESTS");
    this.setState({currentTestIndex: index}, this.cLog);
    var self=this;
    axios.get('//192.168.12.22:81/cgi-bin/test.cgi', {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      if (response.data.indexOf("Hello") > -1) {
        // check if test pass and get response 
        self.CatchTestResponse(self.state.currentTestIndex, response, 1);    
        self.CompleteTest(self.state.currentTestIndex);
      }
    })
    .catch(function (error) {
      self.CatchTestResponse(self.state.currentTestIndex, error, 2);    
      self.CompleteTest(self.state.currentTestIndex);
    });

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
              {...this.state} 
            />
            <SecondBlock 
             StartTest = {this.StartTest}
              {...this.state} 
            />
            <ThirdBlock  
            {...this.state} 
            />
        </div>
      </div>
    );
  }
}

export default App;
