import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/FirstBlock.css';
import axios from 'axios';
import { toast } from 'react-toastify';


const formattedSeconds = (sec) =>
Math.floor(sec / 60) +
  ':' +
('0' + sec % 60).slice(-2)


class FirstBlock extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        secondsElapsed: 0, 
        laps: [],
        lastClearedIncrementer: null,
        hwrev: '',
        sn: ''
    };
    this.incrementer = null;
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

  // TIMER FUNCTIONS
    handleStartClick() {
    if (this.props.disabletest)
    {
      this.ToastMessage("not connected to right client !", "error", 5000);
      return;
    }
    this.setState({
        secondsElapsed: 0,
        laps: [],
        countofTests: 0,
    });

    this.incrementer = setInterval( () =>
        this.setState({secondsElapsed: this.state.secondsElapsed + 1}), 1000);
    
    // start first test
    // check hardware info
    let url = `${this.props.url}cgi-bin/00_hwrev.cgi?${this.props.clientHost}`;
    let self=this;
    axios.get(url , {
    })
    .then(function (response) {
      self.setState({hwrev: response.data.hwrev.revision});
      let modelTypeStr = response.data.hwrev.model;
      let minDigits = response.data.hwrev.min_serial;
      let maxDigits = response.data.hwrev.max_serial;
      self.props.SetTypeModel(modelTypeStr);
      self.props.SetMinMaxDigits(minDigits, maxDigits);
    })
    .catch(function (error) {
      self.state.errorOccured = true;
    });

    this.props.setInitState();

    this.props.StartTest(0);
    }

  // TIMER FUNCTIONS
  handleStartAgainClick() {
   
    this.setState({
        secondsElapsed: 0,
        laps: []
    });
    this.props.countOfTests();

    this.incrementer = setInterval( () =>
        this.setState({secondsElapsed: this.state.secondsElapsed + 1}), 1000);
    
    // start first test
    // check hardware info
    let url = `${this.props.url}cgi-bin/00_hwrev.cgi?${this.props.clientHost}`;
    let self=this;
    axios.get(url , {
    })
    .then(function (response) {
      self.setState({hwrev: response.data.hwrev.revision});
      let modelTypeStr = response.data.hwrev.model;
      let minDigits = response.data.hwrev.min_serial;
      let maxDigits = response.data.hwrev.max_serial;
      self.props.SetTypeModel(modelTypeStr);
      self.props.SetMinMaxDigits(minDigits, maxDigits);
    })
    .catch(function (error) {
      self.state.errorOccured = true;
    });
    this.props.setInitState();
    this.props.StartTest(0);
    }

    handleDownloadClick() {
      this.props.DownloadReport();
    }

    componentWillReceiveProps(nextProps){
      if ((!this.props.errorOccured && nextProps.errorOccured) || nextProps.currentTestIndex === 8 )
           this.handleStopClick()
    }


    handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({lastClearedIncrementer: this.incrementer});
    }

    handleResetClick() {
    clearInterval(this.incrementer);
    this.setState({
        secondsElapsed: 0,
        laps: []
    });
    }

    handleDisable(){
      setTimeout(function () {
        return this.props.disabletest;
      }, 300);
    }

    handleLabClick() {
    this.setState({
        laps: this.state.laps.concat([this.state.secondsElapsed])
    })
    }

  render() {
    return (
      <div>
        <div id="div1">
          <table className="tablecss">
            <tbody>
              <tr className="liRectStyle">
                <td className="thirdsize">
                <ul className="nobullets">
                  <li>
                    <h4>MODEL - {this.props.modelType.toUpperCase()} </h4>
                  </li>
                  { (this.props.clientHost ?
                        <li>
                          <h4>Host : {this.props.clientHost}</h4>
                        </li>
                      : null
                      )}
                    { (this.props.serializationNumber ?
                        <li>
                          <h4>S/N : {this.props.serializationNumber}</h4>
                        </li>
                      : null
                      )}
                      { (this.state.hwrev ?
                      <li>
                        <h4>HW rev: {this.state.hwrev}</h4>
                      </li>
                        : null
                      )}
                      { (this.state.pchost ?
                      <li>
                        <h4>PC host name: {this.state.pchost}</h4>
                      </li>
                        : null
                      )}    
                 </ul>
                </td>
                <td className="thirdsize">

                    <ul className="nobullets">
                     
                        {( (this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer) && !this.props.errorOccured  && this.props.currentTestIndex !== 10 && this.props.currentTestIndex !== 8 ?
                         <li>
                            <Button className="btnn start-btn" onClick={this.handleStartClick.bind(this)}>START TEST</Button>
                          </li>
                        :  null
                        )}
                        {((this.props.errorOccured  && this.props.currentTestIndex >= 10) || this.props.currentTestIndex === 8 ?
                          <li>
                             <Button className="btnnagain start-btn" onClick={this.handleStartAgainClick.bind(this)}>START AGAIN</Button>
                           </li>
                         :  null
                         )}
                    </ul>

                </td>
                <td className="thirdsize">
                    <ul className="nobullets">
                        <li>
                          <div className="stopwatch">
                            <h4 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h4>
                          </div>
                        </li>
                       
                      </ul>
                </td>
              </tr>
              </tbody>
          </table>
          <br/>
          <hr/>
        </div>
      </div>
    );
  }
}


const Button = (props) =>
<button type="button" {...props}   className={"btnn " + props.className } />;
// disabled={!this.handleDisable}

export default FirstBlock;

