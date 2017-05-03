import React from 'react';

class Footer extends React.Component{
   constructor(props) {
        super(props);
    }
    /**
     * @description render
     * @return {ReactElement} markup
     */
  render(){
    return(
        <div className="row container-footer">
          <div className="col-md-3">Response</div>
          <div className="col-md-9">Progress Bar</div>
        </div>
    );
  }
}

export default Footer;
