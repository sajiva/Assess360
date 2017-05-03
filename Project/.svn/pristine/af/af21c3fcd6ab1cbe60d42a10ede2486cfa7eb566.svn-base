import React from 'react';
import LetterIndex from  './Widgets/LetterIndex.jsx';
class EditingAnswerChoice extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            Value:this.props.Value
        };

        this.onChanged=function(e){
            debug("Editing Answer Choice: onChanged",e.target.value);
            this.props.onChanged(e.target.value,this.props.Index);
        }.bind(this);

        this.saveEditing=function(){
            this.setState({
                Value:this.props.Value
            },function(){
                this.props.onStateChange('editable');
            }.bind(this));
        }.bind(this);

        this.cancelEditing=function(){
            this.props.onChanged(this.state.Value,this.props.Index);
            this.props.onStateChange('editable');
        }.bind(this);
    }
    render() {
        return (<div className="answer-choice-main-container">
                    <div className="multiple-choice-answer-choice-editing-mode-container">
                        <form className="form-inline">
                            <div style={{marginRight:'30px'}}  className="input-group mb-2 mr-sm-2 mb-sm-0 multiple-choice-answer-choice-details-container">
                                <div className="input-group-addon"><LetterIndex Index={this.props.Index}/></div>
                                <input onChange={this.onChanged} value={this.props.Value} type="text" className="form-control choice-text" id="anserInput"/>
                            </div>
                            <button onClick={this.saveEditing} type="button" className="btn btn-success choice-save-button">Save</button>
                            <button onClick={this.cancelEditing} type="button" className="btn btn-danger choice-cancel-button">Cancel</button>
                        </form>
                    </div>
                </div>);
    }
}

export default EditingAnswerChoice