import React from 'react';
import TargetGroupAPI from '../../libaries/APIs/TargetGroupAPI.jsx';

class TargetGroupDropDown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            groups: []
        };

        TargetGroupAPI.instance.hook()
            .on("get-targetgroups",function(data){
                if(this.refs.dropdown) {
                    this.setState({
                        groups: data.data.targetGroupsData
                    });
                }
            }.bind(this));

    }

    componentDidMount() {
        TargetGroupAPI.instance.initiate("get-targetgroups");
    }

    render() {
        const $targetGroup = this.state.groups.map(function(item, index) {
           return (
               <option key={index+1} value={item.id}>{item.name}</option>
           )
        });
        return (
            <div className="group-dropdown" ref="dropdown">
                <select onChange={this.props.handleChange}>
                    <option key={0} value={''}>Select a Target Group</option>
                    {$targetGroup}
                </select>
            </div>
        )
    }
}

export default TargetGroupDropDown;