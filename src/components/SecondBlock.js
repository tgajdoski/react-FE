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
  constructor(props) {
    super(props);
  }

  render() {
    return( 
      <div>
        { this.props.currentTestIndex === 1 ?
          <SdCard  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 2 ?
          <Serialization  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 3 ?
          <Video  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 4 ?
          <Audio  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 5 ?
          <Switch  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 6 ?
          <Led  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 7 ?
          <Vibrator  {...this.props} /> : null
        }
        { this.props.currentTestIndex === 8 ?
          <Batery  {...this.props} /> : null
        }
      </div>
    );
  }
}

export default SecondBlock;

