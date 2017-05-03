import React from 'react';
import $ from 'jquery';


class Footer extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div className="baseline-footer">
                {this.props.children && this.props.children.map(function(child,index){
                    return <div onClick={child.disabled?function(){}:child.onClick} className={(child.disabled?"disabled ":" ")+"baseline-footer-item"} key={index}>
                                {child.Content}
                           </div>
                }.bind(this))}
            </div>

        )
    }
}

export default Footer;