import React from 'react';

class Title extends React.Component{
  constructor(props){
    super(props);
  }
  
  /**
   * @description render
   * @return {ReactElement} markup
   */

    render(){
      return (
         <div className='container-title'>{this.props.title}</div>
      );
    }
}

export default Title;
