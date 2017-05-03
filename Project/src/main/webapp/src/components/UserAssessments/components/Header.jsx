import React from 'react';
import {Link} from 'react-router';

/**
* @description including header
*/
class Header extends React.Component{
  /**
   * @description render
   * @return {ReactElement} markup
   */
  render(){
    return(
      <div className="row custom-row headerborder">
        <div className = "col-md-6 bordering">
          Recent Assessments
        </div>
        <div className="col-md-6 bordering">
          <Link to="/app/assessments/create" type='button' className='btn btn-default buttonstyle '>NEW</Link>
        </div>
      </div>);
  }
}
export default Header;
