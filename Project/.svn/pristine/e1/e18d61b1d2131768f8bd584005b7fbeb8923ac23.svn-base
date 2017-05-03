import NavigationButton from './NavigationButton.jsx';
class NavigationInfo{

    /**
     * @var NavigationButton
     */
    LeftButton;

    /**
     * @var NavigationButton
     */
    RightButton;

    /**
     * @var Router
     */
    Router;

    /**
     * @param onChange function
     * @param router Router
     */
    constructor(router, onChange){
        this.LeftButton=new NavigationButton("Back", router, function(){
            onChange();
        });
        this.RightButton=new NavigationButton("Next", router, function(){
            onChange();
        });
        this.Router=router
    }
    EnableRightButton(text, action){
        this.RightButton.Setup(true, text, action);
    }
    EnableLeftButton(text, action){
        this.LeftButton.Setup(true, text, action);
    }
    DisableRightButton(text, action){
        this.RightButton.Setup(false, text, action);
    }
    DisableLeftButton(text, action){
        this.LeftButton.Setup(false, text, action);
    }

}


export default NavigationInfo