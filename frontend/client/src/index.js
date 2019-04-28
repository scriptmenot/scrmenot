import React from 'react';
import ReactDOM from 'react-dom';
import './landing_page/index.css';
import App from './landing_page/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Browse from './landing_page/Browse'
import Details from './landing_page/DomainDetails'

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
        <Route 
        path='/details'
         render={ props => <Details {...props} />}
         />
   </BrowserRouter>, 
//<App/>,
  document.getElementById('root'));
serviceWorker.unregister();
