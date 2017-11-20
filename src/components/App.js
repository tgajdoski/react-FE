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
        "Buzzer/Vibrator Test", "Battery&Charger Test"],
      currentTestIndex: 6,
      currentTestStart: false,
      currentTestPassed: false,
      audioSnapCreated: false,
      videoSnapCounter: 0,
      startVideoDate: null,
      startAudioDate: null,
      imagedata: '',
      errorOccured: false,
      serializationNumber: '',
      testResponses: initState.ininData
    }
  }

  cLog = () => {
    // console.log("VO CALLBACK");
   // debugger;
  //   console.log(this.state.serializationNumber);
    // console.log ("testsCompleted : " + this.state.testsCompleted);
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

  CompleteTest = (index) => {
    let a = this.state.testsCompleted.slice(); //creates the clone of the state
    a[index] = this.state.testList[index];
    this.setState({testsCompleted: a}, this.cLog);
}

  SetSerializationText = (txt) =>{
    this.setState({serializationNumber: txt}, this.cLog);
  }
  SetVideoTestPass = (txt) =>{
   if (!txt)
     this.ErrorTest(this.state.currentTestIndex, new Error("VIDEO TEST FAIL"));
    else {
      this.CompleteTest(this.state.currentTestIndex);
      this.CatchTestMessage(this.state.currentTestIndex, 'VIDEO TEST SUCCESS ', true);
      this.CatchTestResponse(this.state.currentTestIndex, 'VIDEO TEST PASS', 1, this.state.startVideoDate); 
      this.setState({currentTestPassed: true});  
    }
  }

  
  SetAudioTestPass = (txt) => {
      // povikaj final

    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("AUDIO TEST FAIL"));
     else {

      this.ToastMessage("CHECKING AUDIO FINAL TEST ... Please wait" , "info", 1000);
      let url = `//192.168.12.22:81/cgi-bin/04_audio_final.cgi`;
      let self = this;
      axios.get(url)
      .then(function (response) {   
        if (response.data.audio_final.status !=='true') { 
          self.ToastMessage("Error AUDIO FINAL TETS !" , "error", 5000); 
          self.setState({audioSnapCreated: false});
          throw new Error("Error AUDIO-FINAL TEST"); 
        }      
        self.ToastMessage("AUDIO FINAL-TEST SUCCESS ", "success", 2000); 
        self.CompleteTest(self.state.currentTestIndex);
        self.CatchTestMessage(self.state.currentTestIndex, 'AUDIO TEST SUCCESS ', true);
        self.CatchTestResponse(self.state.currentTestIndex, response, 1, self.state.startAudioDate); 
        self.setState({currentTestPassed: true});  
      }).catch(function (error) {
      // ne pravi nisto na error
      console.log(error.message);
      });
     }
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


  NextTest = () =>{
    console.log("VO NEXT TEST");
    this.setState({ currentTestIndex: this.state.currentTestIndex + 1,  currentTestStart: false,  currentTestPassed: false, testMessages: []});
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
      // sersial
       // console.log(self.state.serializationNumber)
        url = `//192.168.12.22:81/cgi-bin/02_serial.cgi?${self.state.serializationNumber}`;
        let DATATANATESTOT = new Date();
        self.ToastMessage("CHECKING SERIALIZATION INFO " , "info", 1000);
        axios.get(url , {
          params: {
           // ID: self.state.serializationNumber
          }
        })
        .then(function (response) {
          console.log(response.data)
          console.log(response.data.serial)
          console.log(response.data.serial.serial)
          if (response.data.serial.status !=='true'){
              self.ToastMessage("Error CHECKING SERIALIZATION INFO !" , "error", 5000); 
              throw new Error("Error CHECKING SERIALIZATION INFO"); 
          }
            self.ToastMessage("SERIALIZATION TEST SUCCESS" , "success", 2000); 
            self.CatchTestMessage(0, `SN: ${response.data.serial.serial}`, true);
            self.CatchTestResponse(self.state.currentTestIndex, response, 1, DATATANATESTOT);   
            self.setState({currentTestPassed: true}); 
            self.CompleteTest(self.state.currentTestIndex);
        }).catch(function (error) {
          self.ToastMessage("Error CHECKING SERIALIZATION INFO !" , "error", 5000); 
          self.ErrorTest(self.state.currentTestIndex, error)
        });
        break;
      case 2:
        // video
        // clear image url
        self.setState({imagedata: ''});
        let dateVideo = new Date();
        self.setState({startVideoDate: dateVideo});
        setTimeout(function(){
            url = `//192.168.12.22:81/cgi-bin/03_video_snap.cgi`;       
            self.ToastMessage("CAPTURING VIDEO... Please wait" , "info", 3000);
            self.setState({videoSnapCounter: self.state.videoSnapCounter + 1, imagedata: url})
        }, 1000);
          // axios.get(url)
          // .then(function (response) { 
          //   debugger;         
            
          // }).catch(function (error) {
          //  // ne pravi nisto na error namerno zgolemi da ne cekame
          //  console.log("VO GRESKA NAMERNO")
          //   self.setState({videoSnapCounter: self.state.videoSnapCounter + 1})
          // });

          if (self.state.videoSnapCounter >= 3){
          {
            url = `//192.168.12.22:81/cgi-bin/03_video_final.cgi`;
            axios.get(url)
            .then(function (response) {   
              if (response.data.fideo_final.test !=='true'){ 
                self.ToastMessage("Error VIDEO FINAL TETS !" , "error", 5000); 
              // throw new Error("Error VIDEO TEST"); 
              }      
              console.log("SE E OK SO FINAL");
              //self.setState({currentTestPassed: true}); 
            }).catch(function (error) {
            // ne pravi nisto na error
            });
          }
        }
        break;
      case 3:
      
         // AUDIO
          //let dateAudio = new Date();
              self.ToastMessage("RECORDIN AUDIO... Please wait" , "info", 6000);
              url = `//192.168.12.22:81/cgi-bin/04_audio_record.cgi`;       
              let dateAudio = new Date();
              self.setState({startAudioDate: dateAudio});
            axios.get(url)
            .then(function (response) { 
             if(response.data.audio_record.status ==='true')
             {
               self.ToastMessage("AUDIO FILE CREATED " , "success", 2000); 
               self.setState({audioSnapCreated: true});
              } 
            }).catch(function (error) {
              self.ToastMessage("Error AUDIO FINAL TETS !" , "error", 5000); 
              self.setState({audioSnapCreated: false});
              throw new Error("Error AUDIO RECORDING TEST FAILD"); 
            });

           // OVA DOLU PROEMNI I ODKOMENTIRAJ
            // if (self.state.videoSnapCounter >= 3){
            // {
            
            // }
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
    

  // // PRVO FATI DATA PRED TESTOT
  // let DATATANATESTOT = new Date();
  //   axios.get(url , {
  //     params: {
  //       ID: 12345
  //     }
  //   })
  //   .then(function (response) {
  //     if (response.data.indexOf("Hello") > -1) {
  //       // check if test pass and get response 
  //       self.CatchTestResponse(self.state.currentTestIndex, response, 1, DATATANATESTOT);   
  //       self.setState({currentTestPassed: true}); 
  //       self.CompleteTest(self.state.currentTestIndex);
  //     }
  //   })
  //   .catch(function (error) {
  //     self.state.errorOccured = true;
  //     self.CatchTestResponse(self.state.currentTestIndex, error, 2,DATATANATESTOT); 
  //     self.setState({currentTestPassed: false});    
  //     self.CompleteTest(self.state.currentTestIndex);
  //   });

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
            { !this.state.errorOccured ? 
              <SecondBlock 
              StartTest = {this.StartTest}
              NextTest = {this.NextTest}
              SetSerializationText = {this.SetSerializationText}
              SetVideoTestPass = {this.SetVideoTestPass}
              SetAudioTestPass = {this.SetAudioTestPass}
                {...this.state} 
              />
              : null
            }
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

