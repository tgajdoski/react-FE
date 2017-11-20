import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class Vibrator extends Component { 
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
                  <li className="linomargins">
                      <ButtonNext onClick={this.handleTest.bind(this)}>
                       Activate Buzzer 
                      </ButtonNext>
                  </li>
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

export default Vibrator;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 