import React from 'react';
import './BlocksContainer.scss';
import AddDomain from './AddDomain.js';
import SearchDomain from './SearchDomain.js';
import TopDomains from './TopDomains.js';
import BrowseCatalogue from './BrowseCatalogue.js';


class BlocksContainer extends React.Component {
    render(){
      return (
          <ul className="BlocksContainer">
            <AddDomain/>
            <SearchDomain {...this.props}/>
            <TopDomains/>
            <BrowseCatalogue {...this.props}/>
          </ul>
      )

    }
}



export default BlocksContainer;