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
      currentTestStart: false,
      currentTestPassed: false,
      errorOccured: false,
      testResponses: initState.ininData
    }
  }

  cLog = () => {
    // console.log("VO CALLBACK");
    // console.log(this.state.currentTestIndex);
    // console.log("testsCompleted : " + this.state.testsCompleted);
    // console.log("testResponses : " + JSON.stringify(this.state.testResponses));
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
      this.setState({testsCompleted: a}, this.cLog);
  }
  
  NextTest = () =>{
    console.log("VO NEXT TEST");
    this.setState({ currentTestIndex: this.state.currentTestIndex + 1,  currentTestStart: false,  currentTestPassed: false});
  }

  StartTest = (index) => {
  //  console.log("STARTING TESTS");
    this.setState({currentTestIndex: index, currentTestStart: true}, this.cLog);
    let self = this;
    let url = '';
    switch(index) {
      case 0:
      // sd card 
        let url1 = '//192.168.12.22:81/cgi-bin/01_sdcard_info.cgi';
        let url2 = '//192.168.12.22:81/cgi-bin/01_sdcard_mount.cgi';
        let url3 = '//192.168.12.22:81/cgi-bin/01_sdcard_write.cgi';
        let url4 = '//192.168.12.22:81/cgi-bin/01_sdcard_umount.cgi';
        let url5 = '//192.168.12.22:81/cgi-bin/01_sdcard_mount.cgi';
        let url6 = '//192.168.12.22:81/cgi-bin/01_sdcard_write_test.cgi';
        let url7 = '//192.168.12.22:81/cgi-bin/01_sdcard_final.cgi';

        axios.get(url1 , {
          params: {}
        }).then(function (response) {
          // ispisi sto treba i povikaj nov
            console.log("01_sdcard_info " + JSON.stringify(response.data.sdcard))
            axios.get(url2 , {
              params: {}
            }).then(function (response) {
              console.log("01_sdcard_mount " + JSON.stringify(response.data.sdcard_mount.mount))
              axios.get(url3 , {
                params: {}
              }).then(function (response) {
                console.log("01_sdcard_write " + JSON.stringify(response.data.sdcard_write.write))
                axios.get(url4 , {
                  params: {}
                }).then(function (response) {
                  console.log("01_sdcard_umount " + JSON.stringify(response.data.sdcard_umount.mount))
                  axios.get(url5 , {
                    params: {}
                  }).then(function (response) {
                    console.log("01_sdcard_mount " + JSON.stringify(response.data.sdcard_mount.mount))
                    axios.get(url6 , {
                      params: {}
                    }).then(function (response) {
                      console.log("01_sdcard_write_test " + JSON.stringify(response.data.sdcard_write_test.write_test))
                      axios.get(url7 , {
                        params: {}
                      }).then(function (response) {
                        console.log("01_sdcard_write_test " + JSON.stringify(response.data.sdcard_final.test))
                           // ovie se za posledniot od sd-card test
                        self.CatchTestResponse(self.state.currentTestIndex, response, 1);   
                        self.setState({currentTestPassed: true}); 
                        self.CompleteTest(self.state.currentTestIndex);
                      }).catch(function (error) {
                        self.state.errorOccured = true;
                        self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
                        self.setState({currentTestPassed: false});    
                        self.CompleteTest(self.state.currentTestIndex);
                      });
                    }).catch(function (error) {
                      self.state.errorOccured = true;
                      self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
                      self.setState({currentTestPassed: false});    
                      self.CompleteTest(self.state.currentTestIndex);
                    });
                  }).catch(function (error) {
                    self.state.errorOccured = true;
                    self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
                    self.setState({currentTestPassed: false});    
                    self.CompleteTest(self.state.currentTestIndex);
                  });
                }).catch(function (error) {
                  self.state.errorOccured = true;
                  self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
                  self.setState({currentTestPassed: false});    
                  self.CompleteTest(self.state.currentTestIndex);
                });
              }).catch(function (error) {
                self.state.errorOccured = true;
                self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
                self.setState({currentTestPassed: false});    
                self.CompleteTest(self.state.currentTestIndex);
              });
            }).catch(function (error) {
              self.state.errorOccured = true;
              self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
              self.setState({currentTestPassed: false});    
              self.CompleteTest(self.state.currentTestIndex);
            }); 
        }).catch(function (error) {
          self.state.errorOccured = true;
          self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
          self.setState({currentTestPassed: false});    
          self.CompleteTest(self.state.currentTestIndex);
        });
        break;
      case 1:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      case 2:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      case 3:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      case 4:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      case 5:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      case 6:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      case 7:
        url = '//192.168.12.22:81/cgi-bin/test.cgi';
        break;
      default : 
        url = '';
  }
    
    axios.get(url , {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      if (response.data.indexOf("Hello") > -1) {
        // check if test pass and get response 
        self.CatchTestResponse(self.state.currentTestIndex, response, 1);   
        self.setState({currentTestPassed: true}); 
        self.CompleteTest(self.state.currentTestIndex);
      }
    })
    .catch(function (error) {
      self.state.errorOccured = true;
      self.CatchTestResponse(self.state.currentTestIndex, error, 2); 
      self.setState({currentTestPassed: false});    
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
             NextTest = {this.NextTest}
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
