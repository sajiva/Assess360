import React from 'react';
import Hints from './Hints.jsx';

class HintsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasHint: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleHintChanged=this.handleHintChanged.bind(this);
    }
    handleHintChanged(value){
        var $this=this;
        this.setState(value,function(){
            $this.props.onHintChanged($this.state);
        });

    }
    handleChange(event) {
        var $this=this;
        this.setState({
            hasHint: event.target.value=="YES"
        },function(){
            $this.props.onHintChanged($this.state);
        });

    }

    render() {

        return (
            <div className="form-group">
                <label className='hints-checkbox-label'>
                    Hints</label>
                <select className='form-control hints-checkbox-select' value={this.state.hasHint?"YES":"NO"} onChange={this.handleChange}>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                </select>

                <Hints onHintChanged={this.props.onHintChanged} onChoose = {this.state.hasHint}/>
            </div>
        )
    }
}
HintsDropdown.propTypes={
    onHintChanged:React.PropTypes.func
};
HintsDropdown.defaultProps={
    onHintChanged:function(){}
};


export default HintsDropdown
