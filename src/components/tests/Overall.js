import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class OverAll extends Component {

  render() {
    return (
      <div id="div2">
        <ul className="nobullets">

          <li className="linomargins">
            <ButtonSuccess >
              PASSED
            </ButtonSuccess>
          </li>

        </ul>
        <br />
        <hr />
      </div>
    );
  }
}

export default OverAll;

const ButtonDange = (props) =>
  <button type="button"  {...props} className="btn btn-danger btn-lg" />


const ButtonSuccess = (props) =>
  <button type="button"  {...props} className="btnOver btn-success btn-lg" />
