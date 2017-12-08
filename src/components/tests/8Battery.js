import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';
import ListMessage from './ListMessage';

class Batery extends Component {


  BATsteps = ["Is USB cable disconnected from Camera?", "Please connect USB cable", "Please disconnected USB cable"];




  handleTest() {
    this.props.handleTestClick();
  }

  // handleTest() {
  //   // confirm 
  //   console.log("counter " + this.state.counter);
  //   this.setState({counter: this.state.counter+1});
  //   if (this.state.counter===1)
  //     {
  //      // da se testira uklucuvanje 
  //      // ako e ukluceno da se kaze deka e OK
  //      // axios 08_charger_conn.cgi

  //     }
  //     if (this.state.counter===2)
  //     {
  //      // da se testira isklucuvanjeto  
  //      // ako e ukluceno da se kaze deka e OK
  //      // axios 08_charger_discon.cgi

  //     }
  //    if (this.state.counter >=2)
  //      this.setState({counterLimit: true});
  //    this.props.handleTestMessages(this.state.counter, this.BATsteps[this.state.counter], true)
  //  }

  componentDidMount() {
    this.props.StartTest(7);
  }

  Confirm() {
    this.props.handleConfirm();
  }

  handleNextTest() {
    this.props.handleNextTest();
  }

  handleFAILTest = () => {
    this.props.handleBateryTest(false);
  }

  handlePASSTest = () => {
    this.props.handleBateryTest(true);
    this.props.handleNextTest();
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
                <ul className="nobullets">
                  <li className="linomargins">
                    <h2>
                      {this.BATsteps[this.props.currentBateryCounter]}
                    </h2>
                  </li>
                  {this.props.currentBateryCounter < 3 ?
                    <li className="linomargins">
                      <ButtonConfirm onClick={this.Confirm.bind(this)}>
                        CONFIRM
                      </ButtonConfirm>
                    </li>
                    : null
                  }
                </ul>
              </td>
              <td className="thirdsize">

                <ul className="nobullets">
                  <li>
                    {/* <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange> */}
                    {this.props.currentBateryCounter >= 3 ?
                      <ButtonSuccess onClick={this.handlePASSTest.bind(this)}>PASS</ButtonSuccess>
                      : null
                    }
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



const ButtonConfirm = (props) =>
  <button type="button"  {...props} className="btnLed btn-success btn-md" />

const ButtonDange = (props) =>
  <button type="button"  {...props} className="btn btn-danger btn-lg" />


const ButtonSuccess = (props) =>
  <button type="button"  {...props} className="btn btn-success btn-lg" />
