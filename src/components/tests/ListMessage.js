import React from 'react';
//import PropTypes from 'prop-types';
import '../../css/ThirdBlock.css';
import SinglMessage from './SingleMessage'

export default function ListMessage(props) {
  return (
    <ul className ="nobullets" >
      {props.testsmessage.map(testMess => <SinglMessage key={testMess.testindex} {...testMess } />)}
    </ul>
  );
};