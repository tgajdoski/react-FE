import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';
import ListTestResults from './ListTestResults';


class ThirdBlock extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // testsdata = [
  //   {
  //     "testindex": 0,
  //     "testname": "SD Card",
  //     "response": {
  //       "sdcard": {
  //         "csd": "400e00325b5900003b377f800a4040af",
  //         "cid": "035344535530384780707b060600969b",
  //         "capacity": "7948206080"
  //       }
  //     },
  //     "passed": 0,
  //     "datetime": "11:51"
  //   },
  //   {
  //     "testindex": 1,
  //     "testname": "Serialization",
  //     "response": {
  //       "Serialization": {
  //         "csd": "400e00325b5900003b377f800a4040af",
  //         "cid": "035344535530384780707b060600969b",
  //         "capacity": "7948206080"
  //       }
  //     },
  //     "passed": 1,
  //     "datetime": "11:52"
  //   },
  //   {
  //     "testindex": 2,
  //     "testname": "Video",
  //     "response": {
  //       "Video": {
  //         "csd": "400e00325b5900003b377f800a4040af",
  //         "cid": "035344535530384780707b060600969b",
  //         "capacity": "7948206080"
  //       }
  //     },
  //     "passed": 2,
  //     "datetime": "11:53"
  //   },
  //   {
  //     "testindex": 3,
  //     "testname": "Audio",
  //     "response": {
  //       "Audio": {
  //         "csd": "400e00325b5900003b377f800a4040af",
  //         "cid": "035344535530384780707b060600969b",
  //         "capacity": "7948206080"
  //       }
  //     },
  //     "passed": 1,
  //     "datetime": "11:51"
  //   },
  //   {
  //     "testindex": 4,
  //     "testname": "Switch",
  //     "response": {
  //       "Switch": {
  //         "csd": "400e00325b5900003b377f800a4040af",
  //         "cid": "035344535530384780707b060600969b",
  //         "capacity": "7948206080"
  //       }
  //     },
  //     "passed": 0,
  //     "datetime": "11:54"
  //   }
  // ];


  render() {
    return (
      <div id="div3">
          <table className="tablecss">
            <tbody>
              <tr className="liRectStyle">
              <td className="thirdsize">
                <h2>TEST RUNS:</h2>
              </td>
                <td>
                  <table>
                    <tbody>
                      <tr>
                      <td className="withBorder">
                          <ListTestResults testsresult={this.props.testResponses} />
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              </tbody>
          </table>
          <br/>
          <hr/>
      </div>
    );
  }
}

export default ThirdBlock;

