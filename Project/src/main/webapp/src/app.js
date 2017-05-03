import React from 'react';
import ReactDOM from 'react-dom';



/***************************************************************************/
/* Pages                                                                   */
/***************************************************************************/
import App from './components/Template/App.jsx';
let div = document.createElement('div');
document.body.appendChild(div);
/***************************************************************************/
/* Routes                                                                  */
/***************************************************************************/
ReactDOM.render((
    <App/>
), div);