import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class Batery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      sessionAttributes: {}, visible: 'open'
    };
  }
 

 
  handleTest() {
    this.props.handleTestClick();
  }


  handleNextTest() {
    this.props.handleNextTest();
  }
  
  handleFAILTest = () => {
    this.props.handleBateryTest(false);
  }

  handlePASSTest = () => {
    this.props.handleBateryTest(true);
  }


  render() {
    return (
      <div id="div2">
      <table className="tablecss">
        <tbody>
          <tr className="liRectStyle">
            <td >
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
                <li>
                    <p>1. Is USB cable disconnected from Camera?</p>
                    <p>2. Please connect USB cable</p>
                    <p>3. Please disconnected USB cable</p>
                </li>
                </ul>
            </td>

              <td>
                <ul className="nobullets">
                <li>
                    <ButtonNext onClick={this.handleTest.bind(this)}>
                     Confirm 
                    </ButtonNext>
                </li>
              </ul>
            </td>
            <td className="thirdsize"> 
          
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

export default Batery;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 