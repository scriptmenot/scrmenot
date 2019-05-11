import React from 'react';
import TopWelcome from './PageParts/TopWelcome.js'
import Description from './PageParts/Description.js'
import BlocksContainer from './BlocksCointainer/BlocksContainer.js'
import GradeDomain from './PageParts/GradeDomain.js'
import Footer from './PageParts/Footer.js'


import './App.scss';

class App extends React.Component {
    render() {
      return (
        <div className="App">
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

