import React from 'react';
import $ from 'jquery';



class Heading extends React.Component {

    constructor(props) {
        super(props);

        this.state={"title":props.title};
    }


    render() {
        return (
            <nav style={{margin:"0px"}} className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">{this.state.title}</a>
                    </div>
                </div>
            </nav>

        )
    }
}

export default Heading;