import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class Vibrator extends Component {

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
              <Button onClick={this.handleTest.bind(this)}>START TEST</Button>
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

const Button = (props) =>
<button type="button" {...props} className={"btnnn " + props.className } />;
