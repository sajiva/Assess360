import React from 'react';
import AssessmentFetcher from 'components/Assessment/Tools/AssessmentController/Tools/AssessmentFetcher.jsx';
import AssessmentSaver from 'components/Assessment/Tools/AssessmentController/Tools/AssessmentSaver.jsx';



class AssessmentController extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            SaveThis:{},
            Save:false,
            Load:this.props.Load
        };

        /*******************************************************************/
        /* Handle the Saving. Dont let it iterupt the load or save         */
        /*******************************************************************/
        this.saveWaiting={};
        this.isSaveWaiting=false;
        this.saveChanges=function(data){
            debug("AssessmentController: saveChanges",data);
            if(this.state.Load || this.state.Save){
                this.saveWaiting=data,
                    this.isSaveWaiting=true;

                return;
            }
            debug("AssessmentController: saveChanges","Saving......");
            this.setState({
                SaveThis:data,
                Save:true
            },function(){
                this.props.onSaveStarted();
            }.bind(this));

        }.bind(this);

        /*******************************************************************/
        /* Check for changes while loading, or saving                      */
        /*******************************************************************/
        this.checkForWaitingChanges=function(){
            debug("AssessmentController: checkForWaitingChanges");
            if(this.isSaveWaiting)
            {
                this.saveWaiting={};
                this.isSaveWaiting=false;

                this.setState({
                    Load:false,
                    Save:true,
                    SaveThis:this.saveWaiting
                },function(){
                    this.props.onSaveStarted();
                }.bind(this));
                return true;
            }
            this.setState({
                Load: false,
            });
            return false;
        }.bind(this);

        /*******************************************************************/
        /* Finished Loading...                                             */
        /*******************************************************************/
        this.finishedLoading=function(){
            debug("AssessmentController: finishedLoading");
            this.setState({
                Load:false
            },function(){
                if(this.checkForWaitingChanges()){
                    this.props.onUpdated();
                }
            }.bind(this));

        }.bind(this);

        /*******************************************************************/
        /* Finished Saving...                                              */
        /*******************************************************************/
        this.finishedSaving=function(){
            debug("AssessmentController: finishedSaving");
            this.setState({
                Save:false
            },function(){

                if(this.checkForWaitingChanges()){
                    this.setState({
                        Load: true
                    },function(){
                        this.props.onSaved();
                    }.bind(this));
                }
                else
                {
                    this.props.onSaved();
                }
            }.bind(this));
        }.bind(this)
    }
    componentWillReceiveProps(props){
        debug("AssessmentController -> componentWillReceiveProps", props);
        this.setState({
            Load:props.Load
        });
    }
    render(){
        return (<AssessmentFetcher  onLoaded={this.finishedLoading} Fetch={this.state.Load} AssessmentID={this.props.AssessmentID}>
            {function (assessment, refresh, isLoading){
                debug("AssessmentController -> AssessmentFetcher -> AssessmentSaver: ",this.props.children);
                return isLoading?
                    (this.props.children(assessment,refresh,this.saveChanges,isLoading,false )):
                    (<AssessmentSaver Save={this.state.Save}  onSaved={this.finishedSaving}  AssessmentID={this.props.AssessmentID} Assessment={this.state.SaveThis}>

                        {function(assessmentSaving,updateData,save,overwriteData,isSaving){
                            debug("AssessmentFetcher -> AssessmentSaver: ",this.props.children);
                            return this.props.children(assessment,refresh,this.saveChanges,isLoading,isSaving );
                        }.bind(this)}
                    </AssessmentSaver>)
            }.bind(this)}
        </AssessmentFetcher>);
    }

}
AssessmentController.propTypes={
    children:React.PropTypes.func,
    onSaved:React.PropTypes.func,
    onSaveStarted:React.PropTypes.func,
    onUpdated:React.PropTypes.func,
    Load:React.PropTypes.bool,
    Save:React.PropTypes.bool,
    AssessmentID:React.PropTypes.number.isRequired,
};
AssessmentController.defaultProps={
    Load:false,
    Save:false,

    onUpdated:function(){},
    onSaved:function(){},
    onSaveStarted:function(){}
};


export default AssessmentController