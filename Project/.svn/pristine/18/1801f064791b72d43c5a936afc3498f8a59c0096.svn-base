import React from 'react';
import $ from 'jquery';
import GenericAPI from '../../libaries/GenericAPI.jsx';
import APIListener from '../../libaries/APIs/APIListener.jsx';

class APIFetcher extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data:false,
            Fetch:this.props.Fetch
        };

        this.api=this.props.Instance.hook()
            .on(this.props.Event,"start",function(e){
                this.props.onLoading();
            }.bind(this))

            .on(this.props.Event,"failed",function(e){
                this.props.onError(e.message);
            }.bind(this))

            .on(this.props.Event,"finished",function(e){
                this.props.onFinish(e.data);
            }.bind(this))

            .on(this.props.Event,"beforeSend",function(e){
                e.continue=this.props.onBeforeSend(e.data);

            }.bind(this))
            .on(this.props.Event,function(e)
            {

                this.setState({
                    data:e.data
                },function()
                {
                    this.props.onSuccess(e.data);
                }.bind(this))

            }.bind(this));
        this.onStartTrigger=function()
        {
            this.setState({
                Fetch:false
            });
            this.props.Instance.initiate(this.props.Event,this.props.Input);




        }.bind(this);


    }
    componentWillReceiveProps(props){
        if(props.Event!=this.props.Event )
        {
            this.api.remove();
            this.api=this.props.Instance.hook()
                .on(props.Event,"start",function(e){
                    this.props.onLoading();
                }.bind(this))

                .on(props.Event,"failed",function(e){
                    this.props.onError(e.message);
                }.bind(this))

                .on(props.Event,"finished",function(e){
                    this.props.onFinish(e.data);
                }.bind(this))

                .on(props.Event,"beforeSend",function(e){
                    e.continue=this.props.onBeforeSend(e.data);

                }.bind(this))
                .on(props.Event,function(e)
                {

                    this.setState({
                        data:e.data
                    },function()
                    {
                        this.props.onSuccess(e.data);
                    }.bind(this))

                }.bind(this));
        }
        if(this.props.Fetch!=props.Fetch) {


            this.setState({
                Fetch: props.Fetch
            }, function () {
                if (this.state.Fetch) {
                    this.onStartTrigger();
                }
            }.bind(this));
        }


        this.setState({data:$.extend(this.state.data,props.defaultData)});
    }
    componentDidMount()
    {
        this.api.open();
        if(this.state.Fetch){
            this.onStartTrigger();
        }
    }
    componentWillUnmount(){
        this.api.close();
    }
    render()
    {
        return this.props.children(this.state.data,this.onStartTrigger);
    }
}
APIFetcher.propTypes =
{
    Fetch:React.PropTypes.bool,
    Instance:React.PropTypes.instanceOf(APIListener).isRequired,
    Event:React.PropTypes.string.isRequired,
    Input:React.PropTypes.object.isRequired,
    onBeforeSend:React.PropTypes.func,
    onStart:React.PropTypes.func,
    onFinish:React.PropTypes.func,
    onError:React.PropTypes.func,
    onSuccess:React.PropTypes.func,
    onLoading:React.PropTypes.func,


    children:React.PropTypes.func
};

APIFetcher.defaultProps = {
    Fetch:false,
    onBeforeSend:function(){return true;},
    onStart:function(){},
    onFinish:function(success,data){},
    onError:function(errorMessage){},
    onLoading:function(){},
    onSuccess:function(data){},
    children: function (data, onChange, onSubmit) {

    }
}
export default APIFetcher