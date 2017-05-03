import React from 'react';

class SideToolBox extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let classNames="side-left-panel "+(this.props.className || "");
        return <div className={classNames} >
                {React.Children.map(this.props.children, function(child, index){
                    return <div className="side-left-item" key={index}>
                             {child}
                           </div>
                }.bind(this))}
               </div>
    }
}

SideToolBox.propTypes={

};

export default SideToolBox