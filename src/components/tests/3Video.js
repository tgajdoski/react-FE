import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import '../../css/tests.css';

class Video extends Component {


  componentWillMount() {
    this.setState({

    })  
  }

  componentDidMount() {
    
  }

  handleTest() {
    this.props.handleTestClick();
  }

  handleNextTest() {
    this.props.handleNextTest();
  }

  handleFAILTest = () => {
    this.props.handleVideoTest(false);
  }

  handlePASSTest = () => {
    this.props.handleVideoTest(true);
  }
  
  render() {
    return (
      <div id="div2">
        <table className="tablecss">
          <tbody>
            <tr className="liRectStyle">
              <td className="thirdsize">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h2> Test: {this.props.testList[this.props.currentTestIndex]}</h2>
                      </td>
                    </tr>
                    <tr>
                    <td>
                      
                  </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td className="thirdsize">
             
              { (this.props.imagedata !=="" ? 
               <img style={{width:'400px', height: '300px'}} src={this.props.imagedata} />
               : null)
              }
              </td>
              <td className="thirdsize"> 
              <ul className="nobullets">
                  { this.props.videoSnapCounter > 2 ? 
                  <li>
                      <ButtonDange onClick={this.handleFAILTest.bind(this)}>FAIL</ButtonDange>
                      <ButtonSuccess onClick={this.handlePASSTest.bind(this)}>PASS</ButtonSuccess>
                  </li>
                  : null
                  }
                  <li>
                      <ButtonNext onClick={this.handleTest.bind(this)}>CAPTURE {this.props.videoSnapCounter}</ButtonNext>
                  </li>
                <li>
                  { !this.props.errorOccured && this.props.videoSnapCounter >= 3 ?
                    <ButtonNext onClick={this.handleNextTest.bind(this)}>NEXT TEST</ButtonNext>
                    : null }
                </li>
              </ul>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <hr />
      </div>
);
}
}

export default Video;

const Button = (props) =>
<button type="button" {...props} className={"btnnn " + props.className } />;

const ButtonNext = (props) =>
<button type="button"  {...props} className="btn btn-primary  btn-lg"/>

const ButtonDange = (props) =>
<button type="button"  {...props} className="btn btn-danger btn-lg"/>


const ButtonSuccess = (props) =>
<button type="button"  {...props} className="btn btn-success btn-lg"/>
