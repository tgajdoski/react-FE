import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';
import ListMessage from './ListMessage';

class Serialization extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textFullfiled: false
    };
  }
 

  // handleTest() {
  //   this.props.handleTestClick();
  // }

  handleNextTest() {
    this.props.handleNextTest();
  }

  handleKeyPressFirst = (e) => {
    if (e.key === 'Enter') {
      this.secondInput.focus();
    }
  }

  handleKeyPressSecond = (e) => {
    if (e.key === 'Enter' ) {
      if (this.firstInput.value === this.secondInput.value){
        this.setState({textFullfiled: true}, this.props.handleSerializationClick(this.firstInput.value));
        // this.startSerial.focus();
      }
      else
      {
        this.firstInput.value = '';
        this.secondInput.value = '';
        this.firstInput.focus();
        this.setState({textFullfiled: false, snvalue: ''});
      }
    }
  }

  handleSerialziaton() {   
    //this.props.handleSerializationClick(this.state.snvalue);
    this.props.handleTestClick();
  }


  componentDidMount(){
    this.firstInput.focus(); 
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
                      <div className="withBorder">
                            <ListMessage testsmessage={this.props.testMessages} />
                      </div>
                  </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="thirdsize">
                        <form>
                          <input className = "form-control" style={{display:'block'}} type="text" onKeyPress={this.handleKeyPressFirst.bind(this)} placeholder="first scan SN"  ref={(input) => { this.firstInput = input; }} />
                          <br/>
                          <input className = "form-control"  style={{float: 'left'}} type="text" onKeyPress={this.handleKeyPressSecond.bind(this)} placeholder="second scan SN"  ref={(input) => { this.secondInput = input; }} />
                          {/* { this.state.textFullfiled ===true ?
                          <Button onClick={this.handleSerialziaton.bind(this)}>Start Serialization</Button>
                          : null
                          } */}
                        </form>
              </td>
              <td className="thirdsize"> 
                  { !this.props.currentTestStart && this.state.textFullfiled === true?     
                    <ButtonNext onClick={this.handleSerialziaton.bind(this)}>Start Serialization</ButtonNext>
                  : null }
                  { !this.props.errorOccured && this.props.currentTestPassed ?
                    <ButtonNext onClick={this.handleNextTest.bind(this)}>NEXT TEST</ButtonNext>
                    : null }
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

export default Serialization;

// const Button = (props) =>
// <button type="button" {...props} className={"btnnn " + props.className } />;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>