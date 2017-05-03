import React from 'react';
import { browserHistory } from 'react-router';


import Header from './Header.jsx';
import Table from './Table.jsx';
import Footer from './Footer.jsx';
import APIComponent from 'components/Containers/APIComponent.jsx';
import AssessmentAPI from 'libaries/APIs/AssessmentAPI.jsx';
import PageContent from 'components/Template/PageContent.jsx';

/**
* @description component that show a table of available assessments
*/
class AssessmentTable extends React.Component {
  /**
   * @description constructor
   * @param {object} props
   */
  constructor(props) {
        super(props);
    }
    /**
     * @description render
     * @return {ReactElement} markup
     */
    render() {

    return( <PageContent className="full-height" PageTitle="Assessment Center" NoContainer={true}>
                <div id="assessments-v2">
                    <div className="outerborder">
                        <Header/>
                        <APIComponent Fetch={true} APIListener={AssessmentAPI.instance} Event={"get-assessments"}>
                            {function(data,change,send,setData,isLoading){
                                return <Table data={data.Assessments} {...this.props}/>
                            }.bind(this)}
                        </APIComponent>
                        <Footer/>
                    </div>
                </div>
            </PageContent>
    );

  }
}
AssessmentTable.propTypes={
    onSelect:React.PropTypes.func
};
AssessmentTable.defaultProps={
    onSelect:function(assessment){
        browserHistory.push("/app/assessments/"+assessment["id"]+"/home");
    }
};
export default AssessmentTable;
