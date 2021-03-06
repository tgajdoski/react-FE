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
    this.props.handleVibTest(false);
  }

  handlePASSTest = () => {
    this.props.handleVibTest(true);
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
                      {this.props.modelType.toUpperCase() === 'VT50' ?
                        <h2>Buzzer Test</h2>
                        : null 
                        }
                         {this.props.modelType.toUpperCase() === 'VT100' ?
                        <h2>Vibrator Test</h2>
                        : null 
                        }
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
              
                <ul className="nobullets">
                    <li>
                      { this.props.currentTestStart ?
                        <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange>
                        : null
                      }
                        { this.props.currentTestStart ?
                        <ButtonSuccess onClick={this.handlePASSTest.bind(this)}>PASS</ButtonSuccess>
                        : null
                      }
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

export default Vibrator;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 