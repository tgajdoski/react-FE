import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';
import axios from 'axios';
import ListMessage from './ListMessage';
import { confirm } from '../../util/confirm';

class Serialization extends Component {

  constructor(props) {
    super(props);
    this.state = {
      textFullfiled: false
    };
  }

  componentDidMount(){
    this.firstInput.focus();

    let url = `${this.props.url}cgi-bin/02_serial_check.cgi`;
    let self = this;
    let sn = this.props.serializationNumber;
    axios.get(url , {
    })
    .then(function (response) {
      console.log('RESPONSE' , response.data);
      console.log('RESPONSE status' , response.data.check_serial.status);
      console.log('is ok ' , response.data.check_serial.status === "true");
      if (response.data.check_serial.status === "true"){
        // pokazi modal 
          sn = response.data.check_serial.serial;
          console.log('confirm vikam');
          confirm(`The device is serialized with ${sn}. Do you want to reseriliaze it?`).then(() => {
            console.log("YES");
            // pusti go kako sto e sega
          }, () => {
            console.log('CANCEL!');
            // tuka treba da go skokneme ovoj test
            self.props.Reserialize(sn);
            self.props.handleNextTest();
          });
      }
    })
    .catch(function (error) {
  
    });
 }
 

  // handleTest() {
  //   this.props.handleTestClick();
  // }

  handleNextTest() {
    this.props.handleNextTest();
  }

  handleKeyPressFirst = (e) => {
   let self =  this;
    if (e.key === 'Enter') {
      if(!isNaN(self.firstInput.value) && self.firstInput.value.toString().length <=this.props.minDigits &&  self.firstInput.value.toString().length >= this.props.maxDigits){
        this.secondInput.focus();  
      }
      else
      {
        self.firstInput.value = '';
      }

    }
  }

  handleKeyPressSecond = (e) => {
    if (e.key === 'Enter' ) {
      if (this.firstInput.value === this.secondInput.value){
        this.setState({textFullfiled: true}, this.props.handleSerializationClick(this.firstInput.value));
        // this.startSerial.focus();
        this.handleSerialziaton();
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
    let self = this;
   // this.props.handleSerializationClick(this.state.snvalue);
    setTimeout(function() {
      self.props.handleTestClick();
    }, 300);
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
                  {/* { !this.props.currentTestStart && this.state.textFullfiled === true?     
                    <ButtonNext onClick={this.handleSerialziaton.bind(this)}>Start Serialization</ButtonNext>
                  : null }
                  { !this.props.errorOccured && this.props.currentTestPassed ?
                    <ButtonNext onClick={this.handleNextTest.bind(this)}>NEXT TEST</ButtonNext>
                    : null } */}
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

// const ButtonNext = (props) =>
// <button type="button"  {...props} className="btn btn-primary  btn-lg"/>