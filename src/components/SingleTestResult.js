import React from 'react';
//import PropTypes from 'prop-types';
import '../css/ThirdBlock.css';

// "testindex"
// "testname": this.state.testList[this.state.currentTestIndex],
// "response": response.data, 
// "passed" : passed,
// "datetime " : this.formatDate(d,5)


export default function SinglTest(props) {
  return (
    <li      
          style={{margin:'1em', clear:'both'}}
        className={props.passed ===0 ? 'gray' : props.passed ===1 ? 'green'  : 'red'}>
        <div style={{float:'left',marginRight:'4em'}}>
          {props.testname}
        </div>
        <div style={{float:'right', marginLeft:'1em'}} >
          {props.datetime}
        </div>
    </li>
  );
};