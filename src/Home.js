import React, { Component} from 'react';
import PropTypes from 'prop-types';
import './Home.css';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '', 
      sessionAttributes: {}, visible: 'open'
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
  }


  

  render() {
    return (
      <div>
        <div id="div1">
          <table className="tablecss">
            <tbody>
              <tr className="liRectStyle">
                <td className="halfsize">
                  <table>
                  <tbody>
                    <tr>
                      <td>
                      <h2>MODEL - test phase </h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3 className="leftfloat"> HOME </h3>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </td>
                <td className="halfsize">
                  <table>
                  <tbody>
                      <tr>
                        <td>
                          <h2>TIME COUNTER</h2>
                        </td>
                      </tr>
                      <tr>
                          <td>
                            <h4 className="leftfloat">S/N : XXXXXXXXXXXX</h4>
                          </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="leftfloat">HW rev: ABC 123</h4>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="leftfloat">test status none/ failed/ok</h4>
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
        <div id="div2">
        <table className="tablecss">
          <tbody>
            <tr className="liRectStyle">
              <td className="halfsize">
                <table>
                <tbody>
                  <tr>
                    <td>
                    <h2>MODEL - test phase </h2>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p> Short explanation regrding proc test </p><br/>
                      <p> - SD card test </p>
                      <p> - SD card test </p>
                      <p> - SD card test </p>
                      <p> - SD card test </p>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
              <td className="halfsize">
              <button>START TEST</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br/>
        <hr/>
      </div>
      <div id="div3">
          <table className="tablecss">
            <tbody>
              <tr className="liRectStyle">
                <td className="halfsize">
                  <h2>MODEL - test phase </h2>
                </td>
                <td className="halfsize">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h2>TESTS COMPLETED</h2>
                        </td>
                      </tr>
                      <tr>
                      <td className="withBorder">
                        qdas datadas
                         d
                         as dataas datasd 
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
      </div>
    );
  }
}

export default Home;

