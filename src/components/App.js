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
import { confirm } from '../util/confirm';



class App extends Component {
  constructor() {
    super();
    this.state = {
      url: '',
      headerText: 'header text',
      testsCompleted: [],
      testMessages: [],
      testList: ["SD card test", "Serialization", "Video Test", "Audio Test", "Switch Test", "LEDs Test",
        "Buzzer/Vibrator Test", "Battery Test"],
      currentTestIndex: null,
      currentTestStart: false,
      currentTestPassed: false,
      audioSnapCreated: false,
      videoSnapCounter: 0,
      startVideoDate: null,
      startAudioDate: null,
      startLedDate: null,
      startBuzzDate: null,
      startSwitchDate: null,
      startBateryDate: null,
      currentBateryCounter: 0,
      switch_check_power: null,
      switch_check_record: null,
      switch_check_reset: null,
      switch_check_mode: null,
      counterLimit: 0,
      imagedata: '',
      errorOccured: false,
      serializationNumber: '',
      counter: 0,
      clientHost:'',
      modelType: '',
      minDigits: 0,
      maxDigits: 10,
      refreshId: null,
      disabletest: null,
      fiveSecsofRecordStarted: false,
      testResponses: initState.initData
    }
  }

  componentDidMount() {
    let url = window.location.origin +'/';
     // ova za local - komentiraj go 
     url = '//192.168.12.22:81/';
    let urlwithParams = new URL(window.location);
    let client = urlwithParams.searchParams.get("client");
    this.setState({url: url, clientHost: client});



    let urls = `${url}cgi-bin/00_host.cgi?${client}`;

    axios.get(urls , {
    })
    .then(function (response) {
  
    })
    .catch(function (error) {
    
    });

    confirm(`Are you on working station ${client}?`).then(() => {
      console.log('PROCEED!') ;
      this.setState({disabletest: false}); 
    }, () => {
      console.log('CANCEL!');
      this.setState({disabletest: true});
      //setTimeout(function () {}, 300);
    });

  }

  callDateFunc = () => {
    let self = this;

    let d = new Date();
    let url = `${self.state.url}cgi-bin/00_date.cgi?${self.formatDate(d, 6)}`;
     axios.get(url)
       .then(function (response) {
  
       }).catch(function (error) {
      
       });
   }

  cLog = () => {
    // console.log("VO CALLBACK");
    // debugger;
    //   console.log(this.state.serializationNumber);
    // console.log ("testsCompleted : " + this.state.testsCompleted);
    // console.log("testResponses : " + JSON.stringify(this.state.testResponses));
  }

  formatDate(dateObj, format) {
    // var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth();
    curr_month = curr_month + 1;
    var curr_year = dateObj.getFullYear();
    var curr_min = dateObj.getMinutes();
    var curr_hr = dateObj.getHours();
    var curr_sc = dateObj.getSeconds();
    if (curr_month.toString().length === 1)
      curr_month = '0' + curr_month;
    if (curr_date.toString().length === 1)
      curr_date = '0' + curr_date;
    if (curr_hr.toString().length === 1)
      curr_hr = '0' + curr_hr;
    if (curr_min.toString().length === 1)
      curr_min = '0' + curr_min;

    if (format === 1)//dd-mm-yyyy
    {
      return curr_date + "-" + curr_month + "-" + curr_year;
    }
    else if (format === 2)//yyyy-mm-dd
    {
      return curr_year + "-" + curr_month + "-" + curr_date;
    }
    else if (format === 3)//dd/mm/yyyy
    {
      return curr_date + "/" + curr_month + "/" + curr_year;
    }
    else if (format === 4)// MM/dd/yyyy HH:mm:ss
    {
      return curr_month + "/" + curr_date + "/" + curr_year + " " + curr_hr + ":" + curr_min + ":" + curr_sc;
    }
    else if (format === 5)// MM/dd/yyyy HH:mm:ss
    {
      return curr_hr + ":" + curr_min + ":" + curr_sc;
    }
    else if (format === 6)///yyyymmDDHHmm
    {
      return curr_year.toString() + curr_month.toString() + curr_date.toString() + curr_hr.toString() + curr_min.toString();
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
      "passed": passed,
      // "datetime" : this.formatDate(d,5)
      "datetime": Seconds_from_T1_to_T2,
      "dateOccured": this.formatDate(d, 5)
    };
    a[index] = tempRecord;

    this.setState({ testResponses: a }, this.cLog);
  }

  CatchTestMessage = (index, message, success) => {
    let a = this.state.testMessages.slice(); //creates the clone of the state
    let tempRecord = {
      "testindex": index,
      "message": message,
      "success": success
    };
    a[index] = tempRecord;
    // this.setState({testMessages: a}, null);
  }

  CompleteTest = (index) => {
    let a = this.state.testsCompleted.slice(); //creates the clone of the state
    a[index] = this.state.testList[index];
    this.setState({ testsCompleted: a }, this.cLog);
  }

  SetSerializationText = (txt) => {
    this.setState({ serializationNumber: txt }, this.cLog);
  }
  SetVideoTestPass = (txt) => {
    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("VIDEO TEST FAIL"));
    else {
      this.CompleteTest(this.state.currentTestIndex);
      this.CatchTestMessage(this.state.currentTestIndex, 'VIDEO TEST SUCCESS ', true);
      this.CatchTestResponse(this.state.currentTestIndex, 'VIDEO TEST PASS', 1, this.state.startVideoDate);
      this.setState({ currentTestPassed: true });
      //odi na drug test
      this.NextTest();
    }
  }

  SetBateryCounter = () => {
    let self = this;
    this.setState({ currentBateryCounter: this.state.currentBateryCounter + 1 },
      function () {
        console.log('currentBateryCounter' , this.state.currentBateryCounter )
        let BATsteps = ["Is USB cable disconnected?", "Please connect USB cable", "Please disconnect USB cable"];
        if (this.state.currentBateryCounter === 2) {
          // da se testira uklucuvanje 
          // ako e ukluceno da se kaze deka e OK
          // axios 08_charger_conn.cgi
          //    self.ToastMessage("CHARGER CONNECTION TEST" , "info", 2000);    
          let url = `${self.state.url}cgi-bin/08_charger_conn.cgi`;
          axios.get(url)
            .then(function (response) {
              if (response.data.charger_connected.charger === 'charge') {
                //     self.ToastMessage("CHARGE ON  battery_mv :" + response.data.charger_connected.battery_mv , "success", 3000);
                //  self.CatchTestMessage(self.state.currentBateryCounter, BATsteps[self.state.currentBateryCounter], true);   
                self.setState({ currentTestStart: true });
                self.CatchTestMessage(self.state.currentBateryCounter, 'CHARGE ON CHECKED ', true);
              }
            }).catch(function (error) {
              self.ToastMessage("Error CHARGER CONNECTION TEST !", "error", 5000);
              self.setState({ currentTestStart: false });
              throw new Error("Error CHARGER CONNECTION TEST");
            });
        }
        if (this.state.currentBateryCounter === 3) {
          // da se testira isklucuvanjeto  
          // ako e ukluceno da se kaze deka e OK
          // axios 08_charger_discon.cgi
          //   self.ToastMessage("CHARGER DISCONNECTION TEST" , "info", 2000);    
          let url = `${self.state.url}cgi-bin/08_charger_discon.cgi`;
          axios.get(url)
            .then(function (response) {
              if (response.data.charger_disconnected.charger === 'discharging') {
                //     self.ToastMessage("CHARGE OFF  battery_mv :" + response.data.charger_disconnected.battery_mv , "success", 3000);  
                //  self.CatchTestMessage(self.state.currentBateryCounter, BATsteps[self.state.currentBateryCounter], true); 

                self.setState({ currentTestStart: true });
                self.CatchTestMessage(self.state.currentBateryCounter, 'CHARGE OFF CHECKED ', true);

                self.SetBateryTestPass(true);
                self.NextTest();

              }
            }).catch(function (error) {
              self.ToastMessage("Error CHARGER DISCONNECTION TEST !", "error", 5000);
              self.setState({ currentTestStart: false });
              throw new Error("Error CHARGER DISCONNECTION TEST");
            });
        }
        if (this.state.counter >= 2) {
          this.setState({ counterLimit: true });
          self.CatchTestMessage(self.state.currentBateryCounter, BATsteps[self.state.currentBateryCounter], true);
       //   self.SetBateryTestPass(true);
        //  self.NextTest();
          //   this.props.handleBateryTest(true);
          //  this.props.handleNextTest();
          //

        }
      }
    );
  }

  SetBateryTestPass = (txt) => {
    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("BATERY TEST FAIL"));
    else {
      this.CompleteTest(this.state.currentTestIndex);
      this.CatchTestMessage(this.state.currentTestIndex, 'BATERY TEST SUCCESS ', true);
      this.CatchTestResponse(this.state.currentTestIndex, 'BATERY TEST PASS', 1, this.state.startBateryDate);
      this.setState({ currentTestPassed: true });
      
      // sto da vikne na krajot
      this.CallFinalPass()
    }
  }

  SetLEDTestPass = (txt) => {
    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("LED TEST FAIL"));
    else {
      this.CompleteTest(this.state.currentTestIndex);
      this.CatchTestMessage(this.state.currentTestIndex, 'LED TEST SUCCESS ', true);
      this.CatchTestResponse(this.state.currentTestIndex, 'LED TEST PASS', 1, this.state.startLedDate);
      this.setState({ currentTestPassed: true });
      //odi na drug test
      this.NextTest();
    }
  }

  SetVibTestPass = (txt) => {
    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("Buzzer/Vibrator TEST FAIL"));
    else {
      this.CompleteTest(this.state.currentTestIndex);
      this.CatchTestMessage(this.state.currentTestIndex, 'Buzzer/Vibrator TEST SUCCESS ', true);
      this.CatchTestResponse(this.state.currentTestIndex, 'Buzzer/Vibrator TEST PASS', 1, this.state.startBuzzDate);
      this.setState({ currentTestPassed: true });

      // GOTO NEXT TEST
      this.NextTest();
    }
  }

  SetTypeModel = (txt) => {
    if (txt)
      this.setState({ modelType: txt });
  }

  SetMinMaxDigits = (minn, maxx) => {
    if (minn)
      this.setState({ minDigits: minn });
    if (maxx)
      this.setState({ maxDigits: maxx });
  }

  SetSWITCHTestPass = (txt) => {
    let self = this;
    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("SWITCH TEST FAIL"));
    else {
      this.CompleteTest(this.state.currentTestIndex);
      this.CatchTestMessage(this.state.currentTestIndex, 'SWITCH TEST SUCCESS ', true);
      this.CatchTestResponse(this.state.currentTestIndex, 'SWITCH TEST PASS', 1, this.state.startSwitchDate);
      this.setState({ currentTestPassed: true });
    }

    // gasi ja skriptata
   // console.log("GASAM SKRIPTA");
    let url2 = `${this.state.url}cgi-bin/05_switch_final.cgi`;

    axios.get(url2).then(function (response) {
     // console.log("SE E OK SO GASENJE SKRIPTA " + JSON.stringify(response.data));
      //odi na drug test
      self.NextTest();
    })
      .catch(function (error) {
        this.ToastMessage("Error SWITCH FINAL TETS !", "error", 5000);
      });

  }

  SetAudioTestPass = (txt) => {
    // povikaj final

    if (!txt)
      this.ErrorTest(this.state.currentTestIndex, new Error("AUDIO TEST FAIL"));
    else {

      //  this.ToastMessage("CHECKING AUDIO FINAL TEST ... Please wait" , "info", 1000);
      let url = `${this.state.url}cgi-bin/04_audio_final.cgi`;
      let self = this;
      axios.get(url)
        .then(function (response) {
          if (response.data.audio_final.status !== 'true') {
            //   self.ToastMessage("Error AUDIO FINAL TETS !" , "error", 5000); 
            self.setState({ audioSnapCreated: false });
            throw new Error("Error AUDIO-FINAL TEST");
          }
          //   self.ToastMessage("AUDIO FINAL-TEST SUCCESS ", "success", 2000); 
          self.CompleteTest(self.state.currentTestIndex);
          self.CatchTestMessage(self.state.currentTestIndex, 'AUDIO TEST SUCCESS ', true);
          self.CatchTestResponse(self.state.currentTestIndex, response, 1, self.state.startAudioDate);
          self.setState({ currentTestPassed: true });
          //odi na drug test
          self.NextTest();

        }).catch(function (error) {
          // ne pravi nisto na error
         // console.log(error.message);
        });
    }
  }

  ErrorTest = (index, error) => {
   
    this.setState({ errorOccured: true }, null);
    this.CatchTestResponse(index, error, 2, new Date());
    this.setState({ currentTestPassed: false });
    this.CatchTestMessage(index, error.message, false);
    this.CompleteTest(index);
    this.CallFinalFail()
    this.setState({ currentTestIndex: 10 }, null); 
  }

  
  CallFinalPass = () => {
   let url = `${this.state.url}cgi-bin/10_passed.cgi`;
    axios.get(url)
      .then(function (response) {
     
      }).catch(function (error) {
      
      });
  }

  CallFinalFail = () => {
    let url = `${this.state.url}cgi-bin/11_failed.cgi`;
    axios.get(url)
      .then(function (response) {
      // console.log(response);
      }).catch(function (error) {
       // console.log('ERROR');
      });
  }

  ToastMessage = (message, type, times) => {
    switch (type) {
      case "success":
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

  DownloadReport = () => {
    let self = this;
   // console.log("TO DOWNLOAD ");
    let url = `${self.state.url}cgi-bin/09_download.cgi`;
    window.location.assign(url);

  }

  NextTest = () => {
   // console.log("VO NEXT TEST");
    this.setState({ currentTestIndex: this.state.currentTestIndex + 1, currentTestStart: false, currentTestPassed: false, testMessages: [] });
    // AKO SE SITE ZAVRSENI 
  }

  setInitState =() =>{
    this.setState({  testsCompleted: [],
      testMessages: [],
      currentTestIndex: null,
      currentTestStart: false,
      currentTestPassed: false,
      audioSnapCreated: false,
      videoSnapCounter: 0,
      startVideoDate: null,
      startAudioDate: null,
      startLedDate: null,
      startBuzzDate: null,
      startSwitchDate: null,
      startBateryDate: null,
      currentBateryCounter: 0,
      switch_check_power: null,
      switch_check_record: null,
      switch_check_reset: null,
      switch_check_mode: null,
      counterLimit: 0,
      imagedata: '',
      errorOccured: false,
      serializationNumber: '',
      counter: 0,
      disabletest: false,
      refreshId: null,
      testResponses: initState.initData
     }, this.cLog);
  }

  StartTest = (index) => {
// init state again
    this.setState({ currentTestIndex: index, currentTestStart: true }, this.cLog);
    let self = this;
    let url = '';
    switch (index) {
      case 0:
      // inicijaliziraj gi site
    
        // sd card 
        let url1 = `${self.state.url}cgi-bin/01_sdcard_info.cgi`;
        let url2 = `${self.state.url}cgi-bin/01_sdcard_mount.cgi`;
        let url3 = `${self.state.url}cgi-bin/01_sdcard_write.cgi`;
        let url4 = `${self.state.url}cgi-bin/01_sdcard_umount.cgi`;
        let url5 = `${self.state.url}cgi-bin/01_sdcard_mount.cgi`;
        let url6 = `${self.state.url}cgi-bin/01_sdcard_write_test.cgi`;
        let url7 = `${self.state.url}cgi-bin/01_sdcard_final.cgi`;
        //    self.ToastMessage("CHECKING SD-CARD INFO" , "info", 1000);
        axios.get(url1, {
          params: {}
        }).then(function (response) {
          // ispisi sto treba i povikaj nov
        //  console.log("01_sdcard_info " + JSON.stringify(response.data.sdcard))
          // STORE INFO FROM SD_INFO
          self.CatchTestMessage(0, "CSD: " + response.data.sdcard.csd, true);
          self.CatchTestMessage(1, "CID: " + response.data.sdcard.cid, true);
          self.CatchTestMessage(2, "Capacity: " + response.data.sdcard.capacity, true);
          //   self.ToastMessage("CSD: " + response.data.sdcard.csd, "success", 3000);
          //    self.ToastMessage("CID: " + response.data.sdcard.cid, "success", 3000);
          //   self.ToastMessage("CAPACITY: " + response.data.sdcard.capacity, "success", 3000);
          //   self.ToastMessage("CHECKING SD-CARD MOUNT" , "info", 1000);
          let dateSDCard = new Date();
          axios.get(url2, {
            params: {}
          }).then(function (response) {
        //    console.log("01_sdcard_mount " + JSON.stringify(response.data.sdcard_mount.mount));
            if (response.data.sdcard_mount.mount !== 'true') {
              //       self.ToastMessage("SD CARD MOUNT TEST FAILED" , "error", 2000);
              throw new Error("SD CARD MOUNT TEST FAILED");
              // throw "SD CARD MOUNT TEST FAILED";
            }
            //     self.ToastMessage("SD CARD MOUNT SUCCESS" , "success", 2000);
            // set success messages and show them in sd card component
            self.CatchTestMessage(3, 'SD CARD MOUNT SUCCESS ', true);
            //      self.ToastMessage("CHECKING SD-CARD WRITE" , "info", 1000);

            //let dateSDWrite = new Date();
            axios.get(url3, {
              params: {}
            }).then(function (response) {
              //          self.ToastMessage("SD CARD WRITE SUCCESS" , "success", 2000);
              // set success messages and show them in sd card component 
              self.CatchTestMessage(4, 'SD CARD WRITE SUCCESS ', true);
              //          self.ToastMessage("CHECKING SD-CARD UNMOUNT" , "info", 1000);

        //      console.log("01_sdcard_write " + JSON.stringify(response.data.sdcard_write.write))
              axios.get(url4, {
                params: {}
              }).then(function (response) {
                console.log("01_sdcard_umount " + JSON.stringify(response.data.sdcard_umount.mount))
                //            self.ToastMessage("SD CARD UNMOUNT SUCCESS" , "success", 2000);
                self.CatchTestMessage(5, 'SD CARD UNMOUNT SUCCESS ', true);
                // SIMULACIJA DEKA NE USPEAL UNMOUNT
                //response.data.sdcard_umount.mount  = 'true'
                if (response.data.sdcard_umount.mount !== 'false') {
                  //       self.ToastMessage("SD CARD UNMOUNT FAILED" , "error", 2000);
                  throw new Error("SD CARD UNMOUNT TEST FAILED");
                }
                //            self.ToastMessage("CHECKING SD-CARD MOUNT" , "info", 1000);
                axios.get(url5, {
                  params: {}
                }).then(function (response) {
            //      console.log("01_sdcard_mount " + JSON.stringify(response.data.sdcard_mount.mount))
                  if (response.data.sdcard_mount.mount !== 'true') {
                    //             self.ToastMessage("SD CARD MOUNT TEST FAILED" , "error", 2000);
                    //throw "SD CARD MOUNT TEST FAILED";
                    throw new Error("SD CARD MOUNT TEST FAILED");
                  }
                  //             self.ToastMessage("SD CARD MOUNT SUCCESS" , "success", 2000);     
                  self.CatchTestMessage(6, 'SD CARD MOUNT SUCCESS ', true);

                  //              self.ToastMessage("CHECKING SD-CARD WRITE-TEST" , "info", 1000);

                  axios.get(url6, {
                    params: {}
                  }).then(function (response) {
          //          console.log("01_sdcard_write_test " + JSON.stringify(response.data.sdcard_write_test.write_test))
                    //               self.ToastMessage("SD CARD WRITE-TEST SUCCESS" , "success", 2000); 
                    self.CatchTestMessage(7, 'SD CARD WRITE-TEST SUCCESS ', true);
                    //               self.ToastMessage("CHECKING SD-CARD FINAL TEST" , "info", 1000);
                    axios.get(url7, {
                      params: {}
                    }).then(function (response) {
                      //                  self.ToastMessage("SD CARD FINAL TEST SUCCESS" , "success", 2000); 
                      self.CatchTestMessage(8, 'SD CARD FINAL TEST SUCCESS ', true);
                //      console.log("01_sdcard_final " + JSON.stringify(response.data.sdcard_final.test))
                      // ovie se za posledniot od sd-card test
                      self.CatchTestResponse(self.state.currentTestIndex, response, 1, dateSDCard);
                      self.setState({ currentTestPassed: true });
                      self.CompleteTest(self.state.currentTestIndex);
                      // odi na next
                      self.NextTest();

                    }).catch(function (error) {
                      self.ToastMessage("Error CHECKING FINAL TEST !", "error", 5000);
                      self.ErrorTest(self.state.currentTestIndex, error)
                    });
                  }).catch(function (error) {
                    self.ToastMessage("Error CHECKING WRITE-TEST !", "error", 5000);
                    self.ErrorTest(self.state.currentTestIndex, error)
                  });
                }).catch(function (error) {
                  self.ToastMessage("Error CHECKING MOUNT TEST !", "error", 5000);
                  self.ErrorTest(self.state.currentTestIndex, error)
                });
              }).catch(function (error) {
                self.ToastMessage("Error CHECKING UNMOUNT TEST !", "error", 5000);
                self.ErrorTest(self.state.currentTestIndex, error)
              });
            }).catch(function (error) {
              self.ToastMessage("Error CHECKING WRITE TEST !", "error", 5000);
              self.ErrorTest(self.state.currentTestIndex, error)
            });
          }).catch(function (error) {
            self.ToastMessage("Error CHECKING MOUNT TEST !", "error", 5000);
            self.ErrorTest(self.state.currentTestIndex, error)
          });
        }).catch(function (error) {
          self.ToastMessage("Error CHECKING SD-CARD INFO !", "error", 5000);
          self.ErrorTest(self.state.currentTestIndex, error)
        });
        break;
      case 1:
        // sersial
        url = `${self.state.url}cgi-bin/02_serial.cgi?${self.state.serializationNumber}`;
        let DATATANATESTOT = new Date();
        //   self.ToastMessage("CHECKING SERIALIZATION INFO " , "info", 1000);
        axios.get(url, {
          params: {
            // ID: self.state.serializationNumber
          }
        })
          .then(function (response) {
            // console.log(response.data)
            // console.log(response.data.serial)
            // console.log(response.data.serial.serial)
            if (response.data.serial.status !== 'true') {
              self.ToastMessage("Error CHECKING SERIALIZATION INFO !", "error", 5000);
              throw new Error("Error CHECKING SERIALIZATION INFO");
            }
            //        self.ToastMessage("SERIALIZATION TEST SUCCESS" , "success", 2000); 
            self.CatchTestMessage(0, `SN: ${response.data.serial.serial}`, true);
            self.CatchTestResponse(self.state.currentTestIndex, response, 1, DATATANATESTOT);
            self.setState({ currentTestPassed: true });
            self.CompleteTest(self.state.currentTestIndex);
            // odi na next
            self.NextTest();

          }).catch(function (error) {
            self.ToastMessage("Error CHECKING SERIALIZATION INFO !", "error", 5000);
            self.ErrorTest(self.state.currentTestIndex, error)
          });
        break;
      case 2:
        // video
        // clear image url
        self.setState({ imagedata: '' });
        let dateVideo = new Date();
        self.setState({ startVideoDate: dateVideo });
        setTimeout(function () {
          url = `${self.state.url}/cgi-bin/03_video_snap.cgi?${self.state.videoSnapCounter + 1}`;
          //  self.ToastMessage("CAPTURING VIDEO... Please wait" , "info", 3000);
          self.setState({ videoSnapCounter: self.state.videoSnapCounter + 1, imagedata: url })
        }, 1000);
        // axios.get(url)
        // .then(function (response) { 
        //   debugger;         

        // }).catch(function (error) {
        //  // ne pravi nisto na error namerno zgolemi da ne cekame
        //  console.log("VO GRESKA NAMERNO")
        //   self.setState({videoSnapCounter: self.state.videoSnapCounter + 1})
        // });

        if (self.state.videoSnapCounter >= 3) {
          {
            url = `${self.state.url}cgi-bin/03_video_final.cgi`;
            axios.get(url)
              .then(function (response) {
                if (response.data.fideo_final.test !== 'true') {
                  self.ToastMessage("Error VIDEO FINAL TETS !", "error", 5000);
                  // throw new Error("Error VIDEO TEST"); 
                }
          //      console.log("SE E OK SO FINAL");
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
       // self.ToastMessage("RECORDING AUDIO... Please wait", "info", 2000);
        url = `${self.state.url}cgi-bin/04_audio_record.cgi`;
        let dateAudio = new Date();
        self.setState({ startAudioDate: dateAudio });
        axios.get(url)
          .then(function (response) {
            // zadrzi go 5 sekundi

            if (response.data.audio_record.status === 'true') {
              //       self.ToastMessage("AUDIO FILE CREATED " , "success", 2000); 
              self.setState({ audioSnapCreated: true });
              setTimeout(function () {
                // console.log("zadrzan timer");  
                 self.setState({ fiveSecsofRecordStarted: true });
                // debugger;
               }, 5000);
            }
          }).catch(function (error) {
            self.ToastMessage("Error AUDIO FINAL TETS !", "error", 5000);
            self.setState({ audioSnapCreated: false });
            throw new Error("Error AUDIO RECORDING TEST FAILD");
          });
        break;
      case 4:
        // SWITCH TEST 
        //  za testiranje samo
        // self.setState({modelType: 'VT-100'});

        self.setState({ counterLimit: false })
        //         self.ToastMessage("SWITCH TEST... Please wait" , "info", 6000);
        url = `${self.state.url}cgi-bin/05_switchdaemon.cgi?vt50`;
        if (self.state.modelType.toUpperCase() === 'VT100')
          url = `${self.state.url}cgi-bin/05_switchdaemon.cgi?vt100`;
        let dateSwitch = new Date();
        self.setState({ startSwitchDate: dateSwitch });
        axios.get(url)
          .then(function (response) {
            // otkako e krenata skriptata sto ....
            // VO LOOP NA 1 SEKUNDA DODEKA NE SE RESI TOA SO 

            var refreshIntervalId = setInterval(
              (function () {
                let url1 = `${self.state.url}cgi-bin/05_switch_check.cgi?vt50`;
                if (self.state.modelType.toUpperCase() === 'VT100')
                  url1 = `${self.state.url}cgi-bin/05_switch_check.cgi?vt100`;
                axios.get(url1).then(function (response) {
                  let power = response.data.switch_check.Power;
                  let record = response.data.switch_check.Record;
                  let reset = response.data.switch_check.Reset;
                  let mode = response.data.switch_check.Mode;
            //      console.log('Power/record/reset ', power, ' ', record, ' ', reset);
                  self.setState({
                    counter: self.state.counter + 1, switch_check_power: Math.floor(power / 2),
                    switch_check_record: Math.floor(record / 2), switch_check_reset: Math.floor(reset / 2), switch_check_mode: Math.floor(mode / 2)
                  });
                }).catch(function (error) {
                  // ne pravi nisto samo vrti
                });
               
                if (self.state.modelType.toUpperCase() === 'VT100') {
                  if (self.state.switch_check_power >= 3 && self.state.switch_check_record >= 3 && self.state.switch_check_reset >= 3) {
                    self.setState({ counterLimit: true })
                    clearInterval(refreshIntervalId);
                  }
                }
                if (self.state.modelType.toUpperCase() === 'VT50') {
                  if (self.state.switch_check_power >= 3 && self.state.switch_check_record >= 3 && self.state.switch_check_reset >= 3 && self.state.switch_check_mode >= 3) {
                    self.setState({ counterLimit: true })
                    clearInterval(refreshIntervalId);
                  }
                }
                //  debugger;
                if (refreshIntervalId)
                  self.setState({ refreshId: refreshIntervalId });
              }), 1000);
            // debugger;
            // if (  refreshIntervalId)
            //   this.setState({refreshId: refreshIntervalId});
          })
          .catch(function (error) {
          
            self.ToastMessage("Error SWITCH  TETS !", "error", 5000);
            self.setState({ audioSnapCreated: false });
            throw new Error("Error SWITCH TEST FAILED");
          });
        break;
      case 5:
        // LED TEST
        url = `${self.state.url}cgi-bin/06_leds_off.cgi`;
        //   self.ToastMessage("LED TURN OFF" , "info", 2000);     
        let LedDate = new Date();
        self.setState({ startLedDate: LedDate });
        axios.get(url)
          .then(function (response) {
            if (response.data.leds_off.status === 'true') {
              //    self.ToastMessage("ALL LED TURNED OFF " , "success", 2000); 
              self.setState({ currentTestStart: true });
            }
          }).catch(function (error) {
            self.ToastMessage("Error TURN OFF LED !", "error", 5000);
            self.setState({ currentTestStart: false });
            throw new Error("Error TURN OFF LED");
          });
        break;
      case 6:
        // BUZZER TEST
        //       self.ToastMessage("BUZZER TEST" , "info", 500);    
        url = `${self.state.url}cgi-bin/07_buzzvib.cgi`;
        let BuzzDate = new Date();
        self.setState({ startBuzzDate: BuzzDate });
        axios.get(url)
          .then(function (response) {
            if (response.data.buzzer_vibrator.status === 'true') {
              //     self.ToastMessage("BUZZER ON" , "success", 1000);   
              self.setState({ currentTestStart: true });
            }
          }).catch(function (error) {
            self.ToastMessage("Error BUZZER TEST !", "error", 5000);
            self.setState({ currentTestStart: false });
            throw new Error("Error BUZZER TEST");
          });
        break;
      case 7:
        // BATERY TEST
        let BatDate = new Date();
        self.setState({ currentTestStart: true });
        //     self.ToastMessage("BATERY TEST STARTED" , "info", 2000);  
        self.setState({ startBateryDate: BatDate });

        break;
      default:
        url = '';
    }
  }


  render() {
    return (
      <div className="App">
        <div className="container" >
          <header className="App-header">
            VT-50/VT-100 Production Test
          </header>
          <FirstBlock
            DownloadReport={this.DownloadReport}
            StartTest={this.StartTest}
            SetTypeModel={this.SetTypeModel}
            SetMinMaxDigits = {this.SetMinMaxDigits}
            setInitState = {this.setInitState}
            {...this.state}
          />
          
            <SecondBlock
              StartTest={this.StartTest}
              NextTest={this.NextTest}
              SetSerializationText={this.SetSerializationText}
              SetVideoTestPass={this.SetVideoTestPass}
              SetAudioTestPass={this.SetAudioTestPass}
              SetSWITCHTestPass={this.SetSWITCHTestPass}
              SetLEDTestPass={this.SetLEDTestPass}
              CatchTestMessage={this.CatchTestMessage}
              SetVibTestPass={this.SetVibTestPass}
              SetBateryTestPass={this.SetBateryTestPass}
              SetBateryCounter={this.SetBateryCounter}
              {...this.state}
            />
  
          <ThirdBlock
            DownloadReport={this.DownloadReport}
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

