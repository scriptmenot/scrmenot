import React from 'react';
import ReactDOM from 'react-dom';
import './landing_page/index.css';
import App from './landing_page/App';
import * as serviceWorker from './serviceWorker';
import { Redirect, Link } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom'
import Browse from './landing_page/Browse'

ReactDOM.render(         
    <BrowserRouter>
        <Route 
        exact path='/'
        render={ props => <App {...props} />}
        />
        <Route 
        path='/browse'
         render={ props => <Browse {...props} />}
         />
   </BrowserRouter>, 
//<App/>,
  document.getElementById('root'));
serviceWorker.unregister();
