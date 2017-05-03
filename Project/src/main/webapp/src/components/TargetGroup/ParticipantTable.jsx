import React from 'react';

class ParticipantTable extends React.Component{
    static propTypes={
        Participants:React.PropTypes.array.isRequired
    };

    render(){
        return <table className="table participant-table table-bordered ">
            <thead>
            <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
                {this.props.Participants.map(function(item, index){
                return (
                    <tr className="participant" key={index} >
                        <td className="name">{index+1}. {item.name}</td>
                        <td className="phone">{index+1}. {item.phone}</td>
                        <td className="email">{index+1}. {item.email}</td>
                    </tr>)
            })
            }
            </tbody>
        </table>
    }

}

export default ParticipantTable