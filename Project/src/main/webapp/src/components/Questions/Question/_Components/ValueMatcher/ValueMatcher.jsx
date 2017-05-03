import React from 'react';

class ValueMatcher extends React.Component{
    constructor(props){
        super(props);

    }
    componentWillMount(){
        this.element=React.createElement(this.props.component,this.props);
    }
    componentWillReceiveProps(){

        this.element=React.createElement(this.props.component,this.props);
    }
    render()
    {
        return React.createElement(this.props.component,this.props);
    }
}
ValueMatcher.propTypes={
    match:React.PropTypes.string,
    component:React.PropTypes.func
};

export default ValueMatcher