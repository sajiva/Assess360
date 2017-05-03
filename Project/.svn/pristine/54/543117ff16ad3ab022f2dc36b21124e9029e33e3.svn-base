import React from 'react';
import $ from 'jquery';
import APIFetcher from './APIFetcher.jsx';
import DataContainer from './DataContainer.jsx';
import APIListener from '../../libaries/APIs/APIListener.jsx';
import Loader from './Loader.jsx';

class APIComponent extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            Fetch:this.props.Fetch,
            data:{
                input:this.props.initialInput?this.props.initialInput:{},
                output:this.props.initialOutput?this.props.initialOutput:{},
            },
            loading:false
        };


        /*******************************************************************/

        this.weWereAskedToGetTheAPI=this.weWereAskedToGetTheAPI.bind(this);
        this.onIncomingOutput=this.onIncomingOutput.bind(this);
        this.onIncomingInput=this.onIncomingInput.bind(this);
        this.weAreLoading=this.weAreLoading.bind(this);
        this.weAreNotLoading=this.weAreNotLoading.bind(this);
        this.weHaveErrors=this.weHaveErrors.bind(this);

    }
    componentDidMount()
    {

        /* his.api.getListener().initiate(this.props.Event,this.state.data.input); */
    }
    componentWillReceiveProps(props)
    {

        this.setState({
            Fetch: props.Fetch,
            data: {
                output: $.extend(true, this.state.data.output, props.initialOutput ? props.initialOutput : {}),
                input: $.extend(true, this.state.data.input, props.initialInput ? props.initialInput : {})
            }
        });


        // }
        // if(props.initialOutput){
        //     this.onIncomingOutput(props.initialOutput);
        // }

    }
    onIncomingOutput(data){

        this.setState({
            Fetch:false,

            data:{
                input:{},
                output:$.extend(true,this.state.data.output,data?data:{})
            }
        },function(){
            this.props.onSubmit(this.state.data.output);
        }.bind(this));
    }
    onIncomingInput(data){


        this.setState({
            errors:null,
            data:{
                output:{},
                input:$.extend(true,this.state.data.input,data?data:{})
            }
        })
    }
    weAreLoading(){
        this.props.onFetching();

        this.setState({
            loading:true
        })
    }
    weAreNotLoading(){


        this.setState({
            loading:false
        })
    }
    weHaveErrors(errors){

        this.setState({
            errors:errors.join("<br>"),
            loading:false
        });
    }
    weWereAskedToGetTheAPI()
    {

        return this.props.APIListener.generate(this.props.Event, this.state.data["input"]);
    }
    render()
    {
        debug("APIComponent this.state.data", this.state.data);
        return (
                <DataContainer defaultData={this.state.data} >

                    {/*******************************************************/}
                    {/* Data Body                                           */}
                    {/*******************************************************/}
                    {function (data, change, submit, putTrigger) {

                        return (
                            <APIFetcher Input={data["input"]?data["input"]:{}}
                                        Event={this.props.Event}
                                        Fetch={this.state.Fetch}
                                        Instance={this.props.APIListener}
                                        onSuccess={this.onIncomingOutput}
                                        onLoading={this.weAreLoading}
                                        onFinish={this.weAreNotLoading}
                                        onError={this.weHaveErrors}
                            >

                                {/*******************************************/}
                                {/* API Listener                            */}
                                {/*******************************************/}
                                {function (data,getTrigger)
                                {
                                    debug("2nd");

                                    {/***************************************/}
                                    {/* Nested Final Components             */}
                                    {/***************************************/}
                                    return (this.state.Fetch && (typeof this.props.initialOutput == "undefined"))?(<Loader/>):(
                                                <div className="api-container">
                                                    {this.props.children(this.state.Fetch?this.props.initialOutput:data, this.onIncomingInput, getTrigger,function(data){ putTrigger({input:data});}.bind(this),this.state.loading)}
                                                    {this.state.loading?(<Loader/>):null}
                                                    {this.state.errors?(<h4 className="text-danger errors">{this.state.errors}</h4>):null}
                                                </div>
                                             );
                                }.bind(this)}

                            </APIFetcher>);


                    }.bind(this)}

                </DataContainer>
            );
    }
}
APIComponent.propTypes = {
    Fetch:React.PropTypes.bool,
    initialInput:React.PropTypes.object,
    initialOutput:React.PropTypes.object,
    APIListener:React.PropTypes.instanceOf(APIListener).isRequired,
    Event:React.PropTypes.string.isRequired,
    onFetching:React.PropTypes.func,
    onChange:React.PropTypes.func,
    onSubmit:React.PropTypes.func,
    children: React.PropTypes.func,

};

APIComponent.defaultProps = {
    Fetch:false,
    onFetching:function(){

    },
    onSubmit:function(){

    },
    children: function (data, change, submit, update) {

    }
}

export default APIComponent