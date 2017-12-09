import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/SecondBlock.css';
import SdCard from './tests/1SdCard';
import Serialization from './tests/2Serialization';
import Video from './tests/3Video';
import Audio from './tests/4Audio';
import Switch from './tests/5Switch';
import Led from './tests/6Led';
import Vibrator from './tests/7Vibrator';
import Batery from './tests/8Battery';
import OverAll from './tests/Overall';
import OverAllFail from './tests/OverallFail';

class SecondBlock extends Component {
  // constructor(props) {
  //   super(props);
  // }

   // TIMER FUNCTIONS
  handleTestClick() {
   this.StartTest(this.currentTestIndex);
  }

  handleSerializationClick(sntxt){
    this.SetSerializationText(sntxt);
  }

  handleVideoTest(fOp){
    this.SetVideoTestPass(fOp);
  }
 


  componentWillReceiveProps(nextProps){
    console.log('AAAAAA' , this.props.errorOccured , nextProps.errorOccured);
    if ((!this.props.errorOccured && nextProps.errorOccured))
      {
        console.log('AAAAAA' , this.props.currentTestIndex);
        // || (this.props.currentTestIndex === 7 && this.props.currentTestPassed)
        // so treba da se napravi
       
      }
  }
  

  handleSWITCHTest(fOp){
    this.SetSWITCHTestPass(fOp);
  }
  
  
  handleBateryTest(fOp){
    this.SetBateryTestPass(fOp);
  }
  handleLEDTest(fOp){
    this.SetLEDTestPass(fOp);
  }

  handleConfirm(){
    this.SetBateryCounter();
  }

  handleVibTest(fOp){
    this.SetVibTestPass(fOp);
  }

  handleAudioTest(fOp){
    this.SetAudioTestPass(fOp);
  }

 // this.CatchTestMessage(this.state.currentTestIndex, 'VIDEO TEST SUCCESS ', true);
  handleTestMessages(index, message, passfail){
    this.CatchTestMessage(index, message, passfail);
  }
 
  componentWillUnmount = () => {
    clearInterval(this.props.refreshId);
  }
  
  handleNextTest() {
    this.NextTest();
   }

  render() {

    console.log('ALLLLAO ', this.props.errorOccured);
    return( 
      <div>
        { this.props.currentTestIndex === 0 ?
          <SdCard  {...this.props} 
            handleTestClick= {this.handleTestClick}
            handleNextTest= {this.handleNextTest}
          /> : null
        }
        { this.props.currentTestIndex === 1 ?
          <Serialization  {...this.props} 
            handleTestClick= {this.handleTestClick}
            handleNextTest= {this.handleNextTest}
            handleSerializationClick = {this.handleSerializationClick}
          /> : null
        }
        { this.props.currentTestIndex === 2 ?
          <Video  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          handleVideoTest = {this.handleVideoTest}
          /> : null
        }
        { this.props.currentTestIndex === 3 ?
          <Audio  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          handleAudioTest = {this.handleAudioTest}
          /> : null
        }
        { this.props.currentTestIndex === 4 ?
          <Switch  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          handleSWITCHTest = {this.handleSWITCHTest}
          /> : null
        }
        { this.props.currentTestIndex === 5 ?
          <Led  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          handleLEDTest = {this.handleLEDTest}
          handleTestMessages = {this.handleTestMessages}
          /> : null
        }
        { this.props.currentTestIndex === 6 ?
          <Vibrator  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          handleVibTest = {this.handleVibTest}
        
          /> : null
        }
        { this.props.currentTestIndex === 7 ?
          <Batery  {...this.props} 
          handleBateryTest= {this.handleBateryTest}
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          handleConfirm = {this.handleConfirm}
          /> : null
        }
        { this.props.currentTestIndex === 8 ?
          <OverAll  {...this.props} 
          /> : null
        }
        { this.props.errorOccured  && this.props.currentTestIndex === 10 ?
          <OverAllFail  {...this.props} 
          /> : null
        }
      </div>
    );
  }
}

export default SecondBlock;

