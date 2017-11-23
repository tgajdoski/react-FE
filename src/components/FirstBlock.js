import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/FirstBlock.css';
import axios from 'axios';


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


  // TIMER FUNCTIONS
    handleStartClick() {
      
     
    this.setState({
        secondsElapsed: 0,
        laps: []
    });
    this.incrementer = setInterval( () =>
        this.setState({secondsElapsed: this.state.secondsElapsed + 1}), 1000);
    
    // start first test
    // check hardware info
    let url = '//192.168.12.22:81/cgi-bin/00_hwrev.cgi';
    let self=this;
    axios.get(url , {
      params: {
        ID: 12345
      }
    })
    .then(function (response) {
      console.log('TUKA SUM' + JSON.stringify(response.data));
      self.setState({hwrev: response.data.hwrev.revision});
      let modelTypeStr = response.data.hwrev.model;
      self.props.SetTypeModel(modelTypeStr);
    })
    .catch(function (error) {
      self.state.errorOccured = true;
    });


    this.props.StartTest(0);
    }

    handleDownloadClick() {
     this.DownloadReport();
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
                  <table>
                  <tbody>
                    <tr>
                      <td>
                      <h2>MODEL - {this.props.modelType.toUpperCase()} </h2>
                      </td>
                    </tr>
                    <tr>
                      {/* <td>
                        <h3 className="leftfloat"> HOME </h3>
                      </td> */}
                    </tr>
                    </tbody>
                  </table>
                </td>
                <td className="thirdsize">

                    <ul className="nobullets">
                     
                        {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer ?
                         <li>
                            <Button className="btnn start-btn" onClick={this.handleStartClick.bind(this)}>START TEST</Button>
                          </li>
                        :  null
                        )}

                        {(((this.props.currentTestIndex === 7 && this.props.currentTestPassed) || this.props.errorOccured) && (this.state.secondsElapsed === 0 || this.incrementer !== this.state.lastClearedIncrementer) ?
                        <li> 
                         <Button className="btnn stop-btn" onClick={this.handleDownloadClick.bind(this)}>DOWNLOAD</Button>
                        </li>
                        :  null
                        )}
                    </ul>

                </td>
                <td className="thirdsize">
                    <ul className="nobullets">
                        <li>
                          <div className="stopwatch">
                            <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                          </div>
                        </li>
                     
                          <li>
                          { (this.props.serializationNumber ?
                          <h4 className="leftfloat">S/N : {this.props.serializationNumber}</h4>
                          : null
                          )}
                          </li>

                        <li>
                        { (this.state.hwrev ?
                          <h4 className="leftfloat">HW rev: {this.state.hwrev}</h4>
                          : null
                        )}
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
<button type="button" {...props} className={"btnn " + props.className } />;


export default FirstBlock;

