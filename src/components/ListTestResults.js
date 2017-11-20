import React from 'react';
//import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';
import SinglTest from './SingleTestResult'

export default function ListTestResults(props) {
  return (
    <ul className ="nobullets">
      {props.testsresult.map(testRes => <SinglTest key={testRes.testindex} {...testRes } />)}
    </ul>
  );
};