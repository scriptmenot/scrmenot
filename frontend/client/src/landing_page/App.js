import React, { Component } from 'react';
import './App.scss';

class App extends React.Component {
    render() {
      return (
        <div className="App">
          <div className="TopWelcome">
            <p>Browse safely together</p>
          </div>
          <div className="Description">
          <p><b>Some catchy title</b></p>
          <p>Description</p>
          
          </div>
          <ul className="BlocksContainer">
            
              <li className="AddDomainBlock"></li>
              <li className="SearchDomainBlock"></li>
              <li className="BrowseCatalogueBlock"></li>
              <li className="TopDomains"></li>
            
          </ul>
          <div>
            <div className="GradeDomain"></div>
          </div>
          <div className="Footer"></div>
        </div>
      );
    }
  }


export default App;

