import React, { Component} from 'react';
//import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';

// "testindex"
// "testname": this.state.testList[this.state.currentTestIndex],
// "response": response.data, 
// "passed" : passed,
// "datetime " : this.formatDate(d,5)


export default function SinglTest(props) {
  return (
    <div
        style={{margin:'1em'}} 
        key={props.testindex} 
        className={props.passed ===0 ? 'gray' : props.passed ===1 ? 'green'  : 'red'}>
        <div style={{float:'left', display:'inline-block'}}>
          {props.testname}
        </div>
        <div style={{float:'right', marginLeft:'1em'}} >
          {props.datetime}
        </div>
    </div>
  );
};