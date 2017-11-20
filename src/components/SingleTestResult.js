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
        style={{margin:'5px', clear:'both'}}
        className= {props.passed ===0 ? 'gray' : props.passed ===1 ? 'green'  : 'red'}>
        <div className="row"> 
          <div className="col">
            {props.testname}
          </div>
          { props.datetime ?  
            <div className="col" >
              {props.datetime} sec
            </div> 
            : null
          }
          <div  className="col" >
            {props.dateOccured}
          </div>
        </div>
    </li>
  );
};