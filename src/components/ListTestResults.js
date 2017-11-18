import React from 'react';
//import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';
import SinglTest from './SingleTestResult'

export default function ListTestResults(props) {
  return (
    <ul style={{margin:'1em', float:'left'}} >
      {props.testsresult.map(testRes => <SinglTest {...testRes } />)}
    </ul>
  );
};