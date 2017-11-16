import React, { Component} from 'react';
import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';


class ThirdBlock extends React.Component {
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
    );
  }
}

export default ThirdBlock;

