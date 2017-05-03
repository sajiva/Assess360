
import TargetGroupAPI from 'libaries/APIs/TargetGroupAPI.jsx';
import APIComponent from 'components/Containers/APIComponent.jsx';

import TargetGroupsTable from './TargetGroupsTable.jsx';

import React from 'react';



class TargetGroupButTogether extends React.Component{


    constructor(props){
        super(props);
    }

    render() {


        return <APIComponent Fetch={true} APIListener={TargetGroupAPI.instance} Event={"get-targetgroups"}>
                    {function(data) {
                        return (<div>
                                    <TargetGroupsTable TargetGroups={data.targetGroupsData}/>
                                </div>);
                    }}
               </APIComponent>

    }

}

export default TargetGroupButTogether