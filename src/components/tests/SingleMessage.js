import React from 'react';
//import PropTypes from 'prop-types';
import '../../css/ThirdBlock.css';


export default function SinglMessage(props) {
  return (
    <li style={{margin:'1em', clear:'both'}} 
        className={ props.success ? 'green'  : 'red'}>
        <div style={{float:'left',marginRight:'4em'}}>
          {props.message}
        </div>
    </li>
  );
};