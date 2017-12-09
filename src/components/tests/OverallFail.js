import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class OverAllFail extends Component {

  render() {
    return (
      <div id="div2">
        <ul className="nobullets">

          <li className="linomargins">
            <ButtonDange >
              FAILED
            </ButtonDange>
          </li>

        </ul>
        <br />
        <hr />
      </div>
    );
  }
}

export default OverAllFail;

const ButtonDange = (props) =>
  <button type="button"  {...props} className="btnOver btn-danger btn-lg" />

