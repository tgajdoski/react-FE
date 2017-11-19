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
 

  handleAudioTest(fOp){
    this.SetAudioTestPass(fOp);
  }
 
  
  handleNextTest() {
    this.NextTest();
   }

  render() {
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
          /> : null
        }
        { this.props.currentTestIndex === 5 ?
          <Led  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          /> : null
        }
        { this.props.currentTestIndex === 6 ?
          <Vibrator  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          /> : null
        }
        { this.props.currentTestIndex === 7 ?
          <Batery  {...this.props} 
          handleTestClick= {this.handleTestClick}
          handleNextTest= {this.handleNextTest}
          /> : null
        }
      </div>
    );
  }
}

export default SecondBlock;

