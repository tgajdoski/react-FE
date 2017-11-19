import React, { Component } from 'react';
//import logo from '../images/logo.svg';
import '../css/App.css';
import FirstBlock from './FirstBlock';
import SecondBlock from './SecondBlock';
import ThirdBlock from './ThirdBlock';
import axios from 'axios';
import initState from './initState';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';



class App extends Component {
  constructor(){
    super();
    this.state = {
      headerText: 'header text',
      testsCompleted: [],
      testMessages: [],
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
  

  CatchTestResponse = (index, response, passed, d1) => {
    let a = this.state.testResponses.slice(); //creates the clone of the state
    let d = new Date();// - d1;

    var dif = d.getTime() - d1.getTime();  
    var Seconds_from_T1_to_T2 = dif / 1000;

    let tempRecord = {
      "testindex": this.state.currentTestIndex,
      "testname": this.state.testList[this.state.currentTestIndex],
      "response": response.data, 
      "passed" : passed,
      // "datetime" : this.formatDate(d,5)
      "datetime": Seconds_from_T1_to_T2,
      "dateOccured" : this.formatDate(d,5)
    };
    a[index] = tempRecord;

    this.setState({testResponses: a}, this.cLog);
  }

  CatchTestMessage = (index, message, success) => {
    let a = this.state.testMessages.slice(); //creates the clone of the state
    let tempRecord = {
      "testindex": index,
      "message": message,
      "success": success
    };
    a[index] = tempRecord;
    this.setState({testMessages: a}, null);
  }

  ErrorTest = (index, error) =>{
    this.setState({errorOccured: true},null);
    this.CatchTestResponse(index, error, 2, new Date()); 
    this.setState({currentTestPassed: false});  
    this.CatchTestMessage(index, error.message, false);  
    this.CompleteTest(index);
  }

  ToastMessage = (message, type, times) =>{
    switch (type){
      case "success" :
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: times
        });
      break;
      case "error": 
        toast.error(message, {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: false
        });
      break;
        case "info": 
        toast.info(message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: times
        });
        break;
      default:
        toast.info(message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000
        });
      }
  };

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
        self.ToastMessage("CHECKING SD-CARD INFO" , "info", 1000);
        let dateInfo = new Date();
        axios.get(url1 , {
          params: {}
        }).then(function (response) {
              // ispisi sto treba i povikaj nov
              console.log("01_sdcard_info " + JSON.stringify(response.data.sdcard))        
              // STORE INFO FROM SD_INFO
              self.CatchTestMessage(0, "CSD: " + response.data.sdcard.csd, true);
              self.CatchTestMessage(1, "CID: " + response.data.sdcard.cid, true);
              self.CatchTestMessage(2, "Capacity: " + response.data.sdcard.capacity, true);
              self.ToastMessage("CSD: " + response.data.sdcard.csd, "success", 3000);
              self.ToastMessage("CID: " + response.data.sdcard.cid, "success", 3000);
              self.ToastMessage("CAPACITY: " + response.data.sdcard.capacity, "success", 3000);
              self.ToastMessage("CHECKING SD-CARD MOUNT" , "info", 1000);
              let dateSDCard = new Date();
            axios.get(url2 , {
              params: {}
            }).then(function (response) {
              console.log("01_sdcard_mount " + JSON.stringify(response.data.sdcard_mount.mount));
              if (response.data.sdcard_mount.mount !=='true'){
                self.ToastMessage("SD CARD MOUNT TEST FAILED" , "error", 2000);
                throw new Error("SD CARD MOUNT TEST FAILED");
               // throw "SD CARD MOUNT TEST FAILED";
              }
              self.ToastMessage("SD CARD MOUNT SUCCESS" , "success", 2000);
              // set success messages and show them in sd card component
              self.CatchTestMessage(3, 'SD CARD MOUNT SUCCESS ', true);
              self.ToastMessage("CHECKING SD-CARD WRITE" , "info", 1000);
            
              //let dateSDWrite = new Date();
              axios.get(url3 , {
                params: {}
              }).then(function (response) {
                self.ToastMessage("SD CARD WRITE SUCCESS" , "success", 2000);
                // set success messages and show them in sd card component 
                self.CatchTestMessage(4, 'SD CARD WRITE SUCCESS ', true);
                self.ToastMessage("CHECKING SD-CARD UNMOUNT" , "info", 1000);
               
                console.log("01_sdcard_write " + JSON.stringify(response.data.sdcard_write.write))
                axios.get(url4 , {
                  params: {}
                }).then(function (response) {
                  console.log("01_sdcard_umount " + JSON.stringify(response.data.sdcard_umount.mount))
                  self.ToastMessage("SD CARD UNMOUNT SUCCESS" , "success", 2000);
                  self.CatchTestMessage(5, 'SD CARD UNMOUNT SUCCESS ', true);
                  // SIMULACIJA DEKA NE USPEAL UNMOUNT
                   //response.data.sdcard_umount.mount  = 'true'
                  if (response.data.sdcard_umount.mount !=='false'){
                    self.ToastMessage("SD CARD UNMOUNT FAILED" , "error", 2000);
                    throw new Error("SD CARD UNMOUNT TEST FAILED");
                  }
                  self.ToastMessage("CHECKING SD-CARD MOUNT" , "info", 1000);
                  axios.get(url5 , {
                    params: {}
                  }).then(function (response) {
                    console.log("01_sdcard_mount " + JSON.stringify(response.data.sdcard_mount.mount))
                    if (response.data.sdcard_mount.mount !=='true'){
                      self.ToastMessage("SD CARD MOUNT TEST FAILED" , "error", 2000);
                      //throw "SD CARD MOUNT TEST FAILED";
                      throw new Error("SD CARD MOUNT TEST FAILED");
                    }
                    self.ToastMessage("SD CARD MOUNT SUCCESS" , "success", 2000);     
                    self.CatchTestMessage(6, 'SD CARD MOUNT SUCCESS ', true);
                    
                    self.ToastMessage("CHECKING SD-CARD WRITE-TEST" , "info", 1000);
                    
                    axios.get(url6 , {
                      params: {}
                    }).then(function (response) {
                      console.log("01_sdcard_write_test " + JSON.stringify(response.data.sdcard_write_test.write_test))
                      self.ToastMessage("SD CARD WRITE-TEST SUCCESS" , "success", 2000); 
                      self.CatchTestMessage(7, 'SD CARD WRITE-TEST SUCCESS ', true);
                      self.ToastMessage("CHECKING SD-CARD FINAL TEST" , "info", 1000);
                      axios.get(url7 , {
                        params: {}
                      }).then(function (response) {
                        self.ToastMessage("SD CARD FINAL TEST SUCCESS" , "success", 2000); 
                        self.CatchTestMessage(8, 'SD CARD FINAL TEST SUCCESS ', true);
                        console.log("01_sdcard_final " + JSON.stringify(response.data.sdcard_final.test))
                           // ovie se za posledniot od sd-card test
                        self.CatchTestResponse(self.state.currentTestIndex, response, 1, dateSDCard);   
                        self.setState({currentTestPassed: true}); 
                        self.CompleteTest(self.state.currentTestIndex);
                      }).catch(function (error) {
                        self.ToastMessage("Error CHECKING FINAL TEST !" , "error", 5000); 
                        self.ErrorTest(self.state.currentTestIndex, error)
                      });
                    }).catch(function (error) {
                      self.ToastMessage("Error CHECKING WRITE-TEST !" , "error", 5000); 
                      self.ErrorTest(self.state.currentTestIndex, error)
                    });
                  }).catch(function (error) {
                    self.ToastMessage("Error CHECKING MOUNT TEST !" , "error", 5000); 
                    self.ErrorTest(self.state.currentTestIndex, error)
                  });
                }).catch(function (error) {
                  self.ToastMessage("Error CHECKING UNMOUNT TEST !" , "error", 5000); 
                  self.ErrorTest(self.state.currentTestIndex, error)
                });
              }).catch(function (error) {
                self.ToastMessage("Error CHECKING WRITE TEST !" , "error", 5000); 
                self.ErrorTest(self.state.currentTestIndex, error)
              });
            }).catch(function (error) {
              self.ToastMessage("Error CHECKING MOUNT TEST !" , "error", 5000); 
              self.ErrorTest(self.state.currentTestIndex,error)
            }); 
        }).catch(function (error) {
          self.ToastMessage("Error CHECKING SD-CARD INFO !" , "error", 5000); 
          self.ErrorTest(self.state.currentTestIndex, error)
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
    

  // PRVO FATI DATA PRED TESTOT
  let DATATANATESTOT = new Date();
    axios.get(url , {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      if (response.data.indexOf("Hello") > -1) {
        // check if test pass and get response 
        self.CatchTestResponse(self.state.currentTestIndex, response, 1, DATATANATESTOT);   
        self.setState({currentTestPassed: true}); 
        self.CompleteTest(self.state.currentTestIndex);
      }
    })
    .catch(function (error) {
      self.state.errorOccured = true;
      self.CatchTestResponse(self.state.currentTestIndex, error, 2,DATATANATESTOT); 
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
             <ToastContainer 
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
            />
        </div>
      </div>
    );
  }
}

export default App;




   // TOAST VARIABLES
  //  console.log("STARTING TESTS");
    //  toast("Default Notification !");
    //   toast.success("Success Notification !", {
    //     position: toast.POSITION.TOP_CENTER
    //   });
    //   toast.error("Error Notification !", {
    //     position: toast.POSITION.TOP_LEFT
    //   });
    //   toast.warn("Warning Notification !", {
    //     position: toast.POSITION.BOTTOM_LEFT
    //   });
      // toast.info("Info Notification !", {
      //   position: toast.POSITION.BOTTOM_CENTER
      // });
      // toast.info("LALALALALA Notification !", {
      //   position: toast.POSITION.BOTTOM_CENTER
      // });
      // toast.info("MRMRMRMRM Notification !", {
      //   position: toast.POSITION.BOTTOM_CENTER
      // });
      // toast("Custom Style Notification !", {
      //   position: toast.POSITION.BOTTOM_RIGHT,
      //   className: 'dark-toast',
      //   progressClassName: 'transparent-progress'
      // });

