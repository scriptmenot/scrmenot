import React, { Component } from 'react';
import './App.scss';

class FirstHalf extends React.Component {
  render() {
    return (
      <div className="firstHalf">
        <p>
          ScriptMeNot
        </p>
        <div className="domainSearch">
          <input type="text" placeholder="Search for domain" />
        </div>
        <img src={require('./green_lock.png')} alt="lock" id="lock" />
      </div>
    );
  }
}

class MenuBar extends React.Component{
  render() {
    return (
        <div className="menuBar">
          <ul>
            <li><a href="#">Catalogs</a></li>
            <li><a href="#">Sign in</a></li>
            <li><a href="#">Sign up</a></li>
          </ul>
        </div>
    );
  }
}

class TopDomains extends React.Component{
  render() {
    return (
        <div className="TopDomains">
          <ul>
            <li>1.<a href="#"></a></li>
            <li>2.<a href="#"></a></li>
            <li>3.<a href="#"></a></li>
            <li>4.<a href="#"></a></li>
            <li>5.<a href="#"></a></li>
          </ul>
        </div>
    );
  }
}

class SecondHalf extends React.Component {
  render() {
    return (
      <div className="secondHalf">
        <MenuBar/>
        <p>
          Top <b style={{color: '#0c4902'}}>5</b> 
          <br></br>  
          most dangerous domains
        </p>
        <TopDomains/>
      </div>
    );
  }
}

class TopLayer extends Component {
  render() {
    return (
        <div className="TopLayer">
          <React.Fragment>
            <FirstHalf />
            <SecondHalf />
          </React.Fragment>
        </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <div className="App">
      <TopLayer/>
      </div>
    );
  }
}



export default App;
