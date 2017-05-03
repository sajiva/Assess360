import React from 'react';
import $ from 'jquery';


class Loader extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
        <div className="loading-spinner" ></div>);
            // <div style={{position:"relative",height:"50px"}}>
            //     <div className="spinner-container" style={{
            //         position:"absolute",
            //         width:"50px",
            //         height:"50px",
            //         top:"50%",
            //         left:"50%",
            //         transform:"translate(-50%,-50%)"
            //     }}>
            //
            //     </div>
            // </div>);

    }
}
Loader.propTypes = {

};

Loader.defaultProps = {

};

export default Loader;