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
                        <p> {this.props.testList[this.props.currentTestIndex]} </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="halfsize"> 
              { !this.props.currentTestStart ?     
                <Button onClick={this.handleTest.bind(this)}>START TEST</Button>
              : null }
              {/* { this.props.currentTestPassed ?
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

export default Batery;

const Button = (props) =>
<button type="button" {...props} className={"btnnn " + props.className } />;

const ButtonNext = (props) =>
<button type="button" {...props} className={"btnnext " + props.className } />;
