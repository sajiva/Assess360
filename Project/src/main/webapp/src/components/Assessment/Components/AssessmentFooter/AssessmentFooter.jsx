import React from 'react';
import NavigationInfo from 'components/Tools/CustomNavigation/NavigationInfo.jsx';

class AssessmentFooter extends React.Component
{
    constructor(props)
    {
        super(props);
    }
    render() //renders page footer
    {

        return (
            <div className="new-assessment-footer">
                <div className="new-assessment-previous-next-buttons">
                    <div onClick={this.context.NavigationInfo.LeftButton.trigger} className={"back-btn "+(this.context.NavigationInfo.LeftButton.Enabled?"":"disabled")}>
                        <i className="fa fa-arrow-circle-o-left"/>
                        {this.context.NavigationInfo.LeftButton.Text}
                    </div>
                    <div onClick={this.context.NavigationInfo.RightButton.trigger} className={"next-btn "+(this.context.NavigationInfo.RightButton.Enabled?"":"disabled")}>
                        {this.context.NavigationInfo.RightButton.Text}
                        <i className="fa fa-arrow-circle-o-right"/>
                    </div>
                </div>
            </div>)
    }

}
AssessmentFooter.contextTypes={
    NavigationInfo:React.PropTypes.instanceOf(NavigationInfo)
};

export default AssessmentFooter