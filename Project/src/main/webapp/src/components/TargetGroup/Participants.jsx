import React from 'react';

class Participants extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let $participants = this.props.participants.map(function(participant, index) {
            return(
                <tr key={index} onClick={() => this.props.toggleSelection(participant)} className={this.props.isSelected(participant) ? "selected" : ""}>
                    <td> {this.props.isSelected(participant) ? <span className= "glyphicon glyphicon-check" /> : <span className= "glyphicon glyphicon-unchecked" />}</td>
                    <td>{participant.name}</td>
                    <td>{participant.email}</td>
                    <td>{participant.phone}</td>
                </tr>
            )
        }.bind(this));

        return (
            <div className = "target-table-container">
                <table className = "table table-bordered">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                    </thead>
                    <tbody>
                    {$participants}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default Participants;