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
          url : "//192.168.12.22:81/cgi-bin/04_audio_play.cgi",
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

  handlePlay() {
    const playSet = {
            url : "//192.168.12.22:81/cgi-bin/04_audio_play.cgi",
            playStatus : "PLAYING"
    }
    this.setState({playSettings: playSet, isplaying: true});
    console.log(this.state.playSettings.playStatus);
  }

  handleStop() {
    const playSet = {
            url : "//192.168.12.22:81/cgi-bin/04_audio_play.cgi",
            playStatus : 'STOPPED'
    }
    this.setState({playSettings: playSet, isplaying: false});
    console.log(this.state.playSettings);
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
                        <h2> Test: {this.props.testList[this.props.currentTestIndex]}</h2>
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
                  <li classname="linomargins">
                      <ButtonNext onClick={this.handleTest.bind(this)}>
                      <span className="glyphicon glyphicon-record"></span> Record 
                      </ButtonNext>
                  </li>
                  <Sound {...this.state.playSettings}
                    //  url= {this.state.playSettings.url}
                    //  playStatus={this.state.playSettings.playStatus}
                  />
                  { !this.state.isplaying ?
                    <li>
                        <ButtonNext onClick={this.handlePlay.bind(this)}>
                        <span className="glyphicon glyphicon-play"></span> Play 
                        </ButtonNext>
                    </li>
                  : null
                  }
                  { this.state.isplaying ?
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
              <ul className="nobullets">
                  <li>
                      <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange>
                      <ButtonSuccess onClick={this.handlePASSTest.bind(this)}>PASS</ButtonSuccess>
                  </li>
                <li>
                  { !this.props.errorOccured  ?
                    <ButtonNext onClick={this.handleNextTest.bind(this)}>NEXT TEST</ButtonNext>
                    : null }
                </li>
                </ul>
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

const Button = (props) =>
<button type="button" {...props} className={"btnnn " + props.className } />

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>
{/* <button type="button" {...props} className={"btnnext " + props.className } />;
 */}


 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 