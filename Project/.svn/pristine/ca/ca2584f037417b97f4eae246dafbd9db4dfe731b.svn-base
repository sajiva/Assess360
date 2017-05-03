import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { createRoutesFromReactChildren } from 'react-router/lib//RouteUtils';


const CrudRoute = () => <div>&lt;CrudRoute&gt; elements are for configuration only and should not be rendered</div>;

CrudRoute.createRouteFromReactElement = (element, parentRoute) => {
    const { path,renderer } = element.props;

    // dynamically add crud routes
    const crudRoute = createRoutesFromReactChildren(
        <Route path={path}>
            <div></div>
        </Route>,
        parentRoute
    )[0];

    // higher-order component to pass path as resource to components
    crudRoute.component = ({ children }) => (
        children
    );
    return crudRoute;
};

export default CrudRoute;