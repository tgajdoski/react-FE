import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

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
                        <p> Short explanation regrding proc test </p><br />
                        <p> - SD card test </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="halfsize">
                { this.props.currentTestPassed ?
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
<button type="button" {...props} className={"btnnext " + props.className } />;
