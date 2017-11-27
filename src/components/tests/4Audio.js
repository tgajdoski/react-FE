import React, { Component } from 'react';
import Sound from 'react-sound';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class Audio extends Component {
  constructor(){
    super();
    this.state = {
      isplaying: false,
      playSettings: {
          url : `${this.props.url}gi-bin/04_audio_play.cgi`,
          playStatus : 'STOPPED'
      }
    }
  }

  componentDidMount() {
    console.log(this.state.playSettings.playStatus);
    console.log(this.state.isplaying);
  }

  handleTest() {
    this.props.handleTestClick();
  }


  handleNextTest() {
    this.props.handleNextTest();
  }
  
  handleFAILTest = () => {
    this.props.handleAudioTest(false);
  }

  handlePASSTest = () => {
    this.props.handleAudioTest(true);
  }

  handlePlay() {
    const playSet = {
            url : `${this.props.url}cgi-bin/04_audio_play.cgi`,
            playStatus : "PLAYING"
    }
    this.setState({playSettings: playSet, isplaying: true});
    console.log(this.state.playSettings.playStatus);
  }

  handleStop() {
    const playSet = {
            url : `${this.props.url}cgi-bin/04_audio_play.cgi`,
            playStatus : 'STOPPED'
    }
    this.setState({playSettings: playSet, isplaying: false});
    console.log(this.state.playSettings);
  }


  render() {
    return (
      <div id="div2">
        <table className="tablecss">
          <tbody>
            <tr className="liRectStyle">
              <td className="thirdsize">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h2>{this.props.testList[this.props.currentTestIndex]}</h2>
                      </td>
                    </tr>
                    <tr>
                    <td>
                      
                  </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="thirdsize">
              <ul className="nobullets">
                  <li className="linomargins">
                      <ButtonNext onClick={this.handleTest.bind(this)}>
                      <span className="glyphicon glyphicon-record"></span> Record 
                      </ButtonNext>
                  </li>
                  <Sound {...this.state.playSettings}
                    //  url= {this.state.playSettings.url}
                    //  playStatus={this.state.playSettings.playStatus}
                  />
                  { (!this.state.isplaying && this.props.audioSnapCreated) ?
                    <li>
                        <ButtonNext onClick={this.handlePlay.bind(this)}>
                        <span className="glyphicon glyphicon-play"></span> Play 
                        </ButtonNext>
                    </li>
                  : null
                  }
                  { this.state.isplaying && this.props.audioSnapCreated ?
                    <li>
                        <ButtonNext onClick={this.handleStop.bind(this)}>
                          <span className="glyphicon glyphicon-stop"></span> Stop 
                        </ButtonNext>
                    </li>
                    : null
                  }
                </ul>
              </td>
              <td className="thirdsize"> 
              { this.props.audioSnapCreated ?
                <ul className="nobullets">
                    <li>
                        <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange>
                        <ButtonSuccess onClick={this.handlePASSTest.bind(this)}>PASS</ButtonSuccess>
                    </li>
                  <li>
                    { !this.props.errorOccured && this.props.currentTestPassed ?
                      <ButtonNext onClick={this.handleNextTest.bind(this)}>NEXT TEST</ButtonNext>
                      : null }
                  </li>
                  </ul>
                  : null
                }
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <hr />
      </div>
);
}
}
export default Audio;

// const Button = (props) =>
// <button type="button" {...props} className={"btnnn " + props.className } />

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 