import React from 'react';
import ReactDOM from 'react-dom';
import App from './LandingPage/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import Browse from './DomainLists/Browse'
import Details from './DomainDetails/DomainDetails'

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
  document.getElementById('root'));
serviceWorker.unregister();
