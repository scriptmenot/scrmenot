import React from 'react';
import './BlocksContainer.scss';
import { Redirect } from 'react-router-dom';

class BrowseCatalogue extends React.Component {

  handlePageChange = () => {
    this.props.history.push('/browse');
    return <Redirect to='/browse' />
  }

  render(){
    return (
      <li className="BrowseCatalogueBlock" onClick={this.handlePageChange} >
      
        <img src={require('./images/folder.png')} alt="folder"/>
      
      </li>
    )
  }
}

export default BrowseCatalogue;