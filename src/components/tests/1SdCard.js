import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';
import ListMessage from './ListMessage';

class SdCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: '',
      sessionAttributes: {}, visible: 'open'
    };
  }
 
  handleNextTest() {
    this.props.NextTest();
  }


  render() {
    return (
      <div id="div2">
        <table className="tablecss">
          <tbody>
            <tr className="liRectStyle">
              <td className="halfsize">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h2> Test phase {this.props.testList[this.props.currentTestIndex]}</h2>
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
              <td className="halfsize">
                { (!this.props.errorOccured && this.props.currentTestPassed) ?
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

export default SdCard;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>