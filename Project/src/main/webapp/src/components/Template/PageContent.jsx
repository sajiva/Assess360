import React from 'react';
import LayoutHeading from 'components/Assessment/Components/AssessmentHeading/LayoutHeading.jsx';
import BasicSideToolBox from 'components/Template/BasicSideToolBox.jsx';
const PageContent = (props,context) => {
    return <div className=" page-root">
                <LayoutHeading UserInfo={context.UserInfo} {...props}/>
                {props.SidePanel || <BasicSideToolBox {...props}/>}
                <div className={(props.NoContainer?"":"container ")+"page-content"}>
                    {props.children}
                </div>
           </div>
};


export default PageContent;