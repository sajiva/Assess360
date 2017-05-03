import React from 'react';
import SetExpiration from "components/Assessment/Components/AssessmentToolBox/Components/SetExpiration.jsx";

class AssessmentExpirationDate extends React.Component{

    constructor(props) {
        super(props);
    }
    render(){

        // TODO Need to get this component ready for JOSH
        // return (<div>
        //             <i className="fa fa-calendar"/>
        //             <Modal contentLabel="expirationDatePopup" isOpen={$this.state.setExpirationOpen}>
        //                 <SetExpiration expirationDate = {$this.state.expirationDate} onChangeExpirationDate = {(value)=>($this.setState({expirationDate:value}))}/>
        //                 <button onClick={()=>$this.onClickCloseSetExpiration()}>Close</button>
        //             </Modal>
        //             Set Expiration
        //         </div>);

        return <SetExpiration {...this.props} expirationDate={this.props.initialExpirationdate}/>
    }

}
AssessmentExpirationDate.propTypes={
    onSaveChanges:React.PropTypes.func,
    initialExpirationdate:React.PropTypes.number
};

export default AssessmentExpirationDate;