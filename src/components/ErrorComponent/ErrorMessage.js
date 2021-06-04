import React from "react";
import { UncontrolledAlert  } from "reactstrap";
import '../css/popup.css'
export default class ErrorMessage extends React.Component {
    constructor(props) {
        super(props)
        
    }
 
    
    render() {
       
    let debug = null;
    if (this.props.debug) {
       
    }
      return (
        
      <UncontrolledAlert  color="danger"  >
        <p className="mb-3"  > {this.props.message}  </p> {debug} 
      </UncontrolledAlert>
    );
  }
}
