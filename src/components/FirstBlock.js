import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/FirstBlock.css';



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
        lastClearedIncrementer: null
    };
    this.incrementer = null;
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }


  // TIMER FUNCTIONS
    handleStartClick() {
    this.incrementer = setInterval( () =>
        this.setState({secondsElapsed: this.state.secondsElapsed + 1}), 1000);
    
    // start first test
    this.props.StartTest();
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
                      <h2>MODEL - test phase </h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3 className="leftfloat"> HOME </h3>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
                <td className="thirdsize">
                  <table>
                  <tbody>
                    <tr>
                      <td>
                        {(this.state.secondsElapsed === 0 ||
                        this.incrementer === this.state.lastClearedIncrementer
                        ? <Button className="start-btn" onClick={this.handleStartClick.bind(this)}>START TEST</Button>
                        :  <div></div>
                        )}
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
                <td className="thirdsize">
                  <table>
                  <tbody>
                      <tr>
                        <td>
                          <div className="stopwatch">
                            <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>
                          </div>
                        </td>
                      </tr>
                      <tr>
                          <td>
                            <h4 className="leftfloat">S/N : XXXXXXXXXXXX</h4>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="leftfloat">HW rev: ABC 123</h4>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="leftfloat">test status none/ failed/ok</h4>
                        </td>
                      </tr>
                      </tbody>
                  </table>
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

