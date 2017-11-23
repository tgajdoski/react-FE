import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';
import ListMessage from './ListMessage';

class Led extends Component {

  constructor(props) {
    super(props);
    this.state = {
     counter: 0,
     counterLimit:false
    };
  }
 
  VT100enum = ["All LED are OFF", "RED2 is ON?","BICOLOR1_R is ON?", "BICOLOR1_G is ON?", "GREEN1 is ON?", "RED1 is ON?", "BLUE1 is ON?"];
  VT50enum = ["All LED are OFF", "RED is ON?", "GREEN is ON?","BLUE is ON?"];
  
  componentDidMount(){
    this.props.StartTest(5);
  }

  handleTest() {
   // confirm 
   console.log("counter " + this.state.counter);
   this.setState({counter: this.state.counter+1});
   if (this.props.modelType.toUpperCase()==='VT-50')
   {
    if (this.state.counter >=3)
      this.setState({counterLimit: true});
    this.props.handleTestMessages(this.state.counter, this.VT50enum[this.state.counter], true)
   }
   if (this.props.modelType.toUpperCase()==='VT-100')
   {
    if (this.state.counter >=6)
      this.setState({counterLimit: true});
    this.props.handleTestMessages(this.state.counter, this.VT100enum[this.state.counter], true)
   }

  }


  handleNextTest() {
    this.props.handleNextTest();
  }
  
  handleFAILTest = () => {
    this.props.handleLEDTest(false);
  }

  handlePASSTest = () => {
    this.props.handleLEDTest(true);
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
                { this.props.modelType.toUpperCase()==='VT-50' ? 
                  <h2>
                    {this.VT50enum[this.state.counter]}
                  </h2>
                  : null
                }
                 { this.props.modelType.toUpperCase()==='VT-100' ? 
                  <h2>
                    {this.VT100enum[this.state.counter]}
                  </h2>
                  : null
                }
                </li>
                { !this.state.counterLimit  ?
                  <li className="linomargins">
                      <ButtonConfirm onClick={this.handleTest.bind(this)}>
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
                      <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange>
                      { this.state.counterLimit ?
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

export default Led;


const ButtonConfirm = (props) =>
<button type="button"  {...props} className="btnLed btn-success btn-md"/> 


const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

 const ButtonDange = (props) =>
 <button type="button"  {...props} className="btn btn-danger btn-lg"/>
 

 const ButtonSuccess = (props) =>
 <button type="button"  {...props} className="btn btn-success btn-lg"/>
 