import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';
import SinglTest from './SingleTestResult'

export default function ListTestResults(props) {
  return (
    <div>
      {props.testsresult.map(testRes => <SinglTest {...testRes } />)}
    </div>
  );
};