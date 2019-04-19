import React, { Component } from 'react';
import './BlocksContainer.scss';

class BlocksContainer extends React.Component {
    render() {
      return (
          <ul className="BlocksContainer">
            <li className="AddDomainBlock"></li>
            <li className="SearchDomainBlock"></li>
            <li className="BrowseCatalogueBlock"></li>
            <li className="TopDomains"></li>
          </ul>
      )

    }
}

export default BlocksContainer;