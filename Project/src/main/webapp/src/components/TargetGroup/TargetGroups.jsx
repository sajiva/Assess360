import React from 'react';
import TargetGroupAPI from '../../libaries/APIs/TargetGroupAPI.jsx';
import BasicSideToolBox from 'components/Template/BasicSideToolBox.jsx';
import PageContent from 'components/Template/PageContent.jsx';



class TargetGroups extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                name: ''
            },
            groups: []
        };

        const $this=this;

        /*******************************************************************/
        /* Correct Way to do this since you want to be able to do...       */
        /* this.apiGet.close() inside of the componentDidUnMount           */
        /*******************************************************************/
        this.apiGet = TargetGroupAPI.instance.hook()
          .on("get-targetgroups",function(data){
                $this.setState({
                    groups: data.data.targetGroupsData
                });
        }).on("create-new-targetgroup", function (data) {

        });

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        this.apiGet.getListener().initiate("get-targetgroups");
    }
    componentWillUnmount()
    {
        this.apiGet.close();
    }
    handleChange(event) {
        this.setState({
            data: {
                name: event.target.value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.apiGet.getListener().initiate("create-new-targetgroup",this.state.data);
        this.setState({
            data: {
                name: ''
            }
        });
    }

    render() {
        console.log(this.state.groups);
        let $targetGroups = (this.state.groups == undefined) ? null
            : this.state.groups.map(function(item, index){
            return (
                <tr onClick={()=>{window.location="/app/target-group/"+item.id}} className="target-group" key={index}>
                    <td className="name">{index+1}. {item.name}</td>
                </tr>
            );
        });

        return (
            <PageContent PageTitle="Target Groups">
                    <form onSubmit={this.handleSubmit} className="add-target-group-form">
                        <input type="text" value={this.state.data.name} onChange={this.handleChange} required="true" placeholder="Target Group Name" className="form-control"/>
                        <button type="submit" className="btn btn-target-group">Add Target Group</button>
                    </form>
                    <div className="main-content">
                        <table className="table table-bordered">
                            <thead>
                                <tr><th>Group Name</th></tr>
                            </thead>
                            <tbody>
                                {$targetGroups}
                            </tbody>
                        </table>
                    </div>
            </PageContent>
        )
    }
}

export default TargetGroups;