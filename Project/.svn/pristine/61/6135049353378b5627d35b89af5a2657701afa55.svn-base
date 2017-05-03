
class NavigationButton{

    /**
     * @param string
     */
    Text;

    /**
     * @param bool
     */
    Enabled;

    /**
     * @param string|function
     */
    Action;

    /**
     * @param React
     */
    Router;

    /**
     * @param function
     */
    onChanged;
    constructor(text, router, onChanged){
        this.Enabled=false;
        this.Text=text;
        this.Action=null;
        this.Router=router;
        this.onChanged=onChanged;
        this.trigger=this.trigger.bind(this);
    }
    Setup(enable, text, action){
        this.Enabled=enable;
        this.Text=text;
        this.Action=action;
        this.onChanged();

    }
    trigger(){

        /*******************************************************************/
        if(!this.Enabled){
            return;
        }

        /*******************************************************************/
        if(typeof this.Action == "string"){
            this.Router.push(this.Action);
            return;
        }

        /*******************************************************************/
        if(typeof this.Action=="function"){
            this.Action();
        }
    }
}


export default NavigationButton
