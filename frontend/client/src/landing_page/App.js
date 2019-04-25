import React from 'react';
import TopWelcome from './TopWelcome.js'
import Description from './Description.js'
import BlocksContainer from './BlocksContainer.js'
import GradeDomain from './GradeDomain.js'
import Footer from './Footer.js'
import { BrowserRouter, Route } from 'react-router-dom';
import Browse from './Browse';

import './App.scss';

class App extends React.Component {
    render() {
      return (
        <div className="App">
     {/* <BrowserRouter>
         <Route 
        path='/browse'
         render={ props => <Browse {...props} />}
         />
   </BrowserRouter> */}
          <TopWelcome/>
          <Description/>
          <BlocksContainer {...this.props}/>
          <GradeDomain/>
          <Footer/>
        </div>
      );
    }
  }


export default App;

