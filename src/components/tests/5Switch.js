import React, { Component } from 'react';

import '../../css/tests.css';

class Switch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      sessionAttributes: {}, visible: 'open'
    };
  }
 
 
  componentDidMount(){
    this.props.StartTest(4);
  }

  handleTest() {
    this.props.handleTestClick();
  }


  handleNextTest() {
    this.props.handleNextTest();
  }
  
  handleFAILTest = () => {
    this.props.handleSWITCHTest(false);
  }

  handlePASSTest = () => {
    this.props.handleSWITCHTest(true);
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
                      <ButtonNumbers><span className="badge">{this.props.switch_check_power}</span></ButtonNumbers>
                      <ButtonNumbers><span className="badge">{this.props.switch_check_record}</span></ButtonNumbers>
                      <ButtonNumbers><span className="badge">{this.props.switch_check_reset}</span></ButtonNumbers>
                      <ButtonNumbers><span className="badge">a</span></ButtonNumbers>
                      <ButtonNumbers><span className="badge">u</span></ButtonNumbers>
                      <ButtonNumbers><span className="badge">f</span></ButtonNumbers>
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

export default Switch

const ButtonNumbers = (props) =>
<button type="button"  {...props} className="btncounter btn-primary"/> 

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 