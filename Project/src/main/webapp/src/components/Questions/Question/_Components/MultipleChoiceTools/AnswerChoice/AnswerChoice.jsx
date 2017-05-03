import React from 'react';
import ValueMatches from '../../ValueMatcher/ValueMatches.jsx';
import ValueMatcher from '../../ValueMatcher/ValueMatcher.jsx';

import SimpleAnswerChoice from './SimpleAnswerChoice.jsx';
import EditableAnswerChoice from './EditableAnswerChoice.jsx';
import EditingAnswerChoice from './EditingAnswerChoice.jsx';
class AnswerChoice extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            AnswerChoiceState:this.props.CurrentState=="editable"?"editable":"view"
        };

        this.onStateChange=function(state){
            this.setState({
                AnswerChoiceState:state
            });
        }.bind(this);
    }
    componentWillReceiveProps(props){
        /*this.setState({
         AnswerChoiceState:props.CurrentState=="editable"?"editable":"view"
         });*/
    }
    render() {
        /*******************************************************************/
        return  <ValueMatches __Value={this.state.AnswerChoiceState} Value={this.props.Value} Index={this.props.Index} onStateChange={this.onStateChange}  onAnswerDelete={this.props.onAnswerDelete} onChanged={this.props.onChanged} >
                    <ValueMatcher match={"view"}     component={SimpleAnswerChoice}/>
                    <ValueMatcher match={"editable"} component={EditableAnswerChoice}/>
                    <ValueMatcher match={"editing"}  component={EditingAnswerChoice}/>
                    {/* <ValueMatcher match={"running"}  component={null}/>{ TODO put in the Running Part - sajiva } */}
                </ValueMatches>
    }
}
AnswerChoice.propTypes={
    onAnswerDelete:React.PropTypes.func,
    Value:React.PropTypes.string,
    Index:React.PropTypes.number,
    CurrentState:React.PropTypes.string.isRequired,
    onChanged:React.PropTypes.func
};
AnswerChoice.defaultProps={
    onAnswerDelete:function(){},
    onChanged:function(){},
};

export default AnswerChoice

