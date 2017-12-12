import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class Video extends Component {
 
  constructor(props) {
    super(props)
    this.state = {
      intervalID: 0,
     imageurl : `${this.props.url}cgi-bin/03_video_live.cgi`
    }
  }



  componentWillMount() {
    
  }

  componentDidMount() {
    // dali puka celo vreme
    this.handleStream();
  }

  handleTest() {
    console.log(this.state.intervalID);
    clearInterval(this.state.intervalID);
    this.props.handleTestClick();
  }


  handleStream = () => {
    let self = this;
    console.log("pukam celo vreme");
    var intervalID = setInterval(function() {
      console.log("pukam");
      console.log(`${self.props.url}/cgi-bin/03_video_live.cgi`);
      self.setState({imageurl: `${self.props.url}/cgi-bin/03_video_live.cgi`});
    }, 3000);

    self.setState({intervalID: intervalID});

    setTimeout(function() {
      clearInterval(intervalID);
    }, 60000);

    if (self.props.videoSnapCounter >0){
      // vrti povik celo vreme kon scrpta na 3 sekundi
       clearInterval(intervalID);
    }
    
  }

  handleNextTest() {
    this.props.handleNextTest();
  }

  handleFAILTest = () => {
    this.props.handleVideoTest(false);
  }

  handlePASSTest = () => {
    this.props.handleVideoTest(true);
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
                    <td className="thirdsize">
                    
                     { 
                       (this.props.videoSnapCounter === 0 ? 
                      <img style={{width:'400px', height: '300px'}} alt='capture' src={this.state.imageurl} />
                      : null)
                     }
                     </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="thirdsize">
             
              { (this.props.imagedata !=="" ? 
               <img style={{width:'400px', height: '300px'}} alt='capture' src={this.props.imagedata} />
               : null)
              }
              </td>
              <td className="thirdsize"> 
              <ul className="nobullets">
                <li>
                  <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange>
                </li>
                  { this.props.videoSnapCounter > 2 ? 
                  <li>
                      
                      <ButtonSuccess onClick={this.handlePASSTest.bind(this)}>PASS</ButtonSuccess>
                  </li>
                  : null
                  }
                  <li>
                      <ButtonNext onClick={this.handleTest.bind(this)}>CAPTURE <span className="badge">{this.props.videoSnapCounter}</span></ButtonNext>
                  </li>
                <li>
                  { !this.props.errorOccured && this.props.videoSnapCounter >= 3 && this.props.currentTestPassed ?
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

export default Video;

// const Button = (props) =>
// <button type="button" {...props} className={"btnnn " + props.className } />;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

const ButtonDange = (props) =>
<button type="button"  {...props} className="btn btn-danger btn-lg"/>


const ButtonSuccess = (props) =>
<button type="button"  {...props} className="btn btn-success btn-lg"/>
