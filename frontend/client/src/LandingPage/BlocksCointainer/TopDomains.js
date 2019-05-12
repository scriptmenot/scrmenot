import React from 'react';
import './BlocksContainer.scss';


class TopDomains extends React.Component {

  render(){
    return (
      <li className="TopDomains">
        <img src={require('./images/five.png')} alt="folder"/>
      </li>
    )
  }
}

export default TopDomains;