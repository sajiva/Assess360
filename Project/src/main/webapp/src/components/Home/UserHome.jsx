import React from "react";
import {Router, Route, browserHistory} from "react-router";

import LayoutHeading from 'components/Assessment/Components/AssessmentHeading/LayoutHeading.jsx';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            loggedStatus:""
        };


    }


    render() {
        return (<div>
                    {this.props.children}
                </div>);

    }
}

export default App;