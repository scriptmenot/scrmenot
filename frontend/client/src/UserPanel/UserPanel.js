import React from 'react';
import NavBar from '../LandingPage/PageParts/NavBar.js'
import DescriptionUser from './DescriptionUser.js'
import BrowseList from '../DomainLists/BrowseList.js'
import Footer from '../LandingPage/PageParts/Footer.js'
import '../LandingPage/PageParts/DescriptionUser.scss';


class Browse extends React.Component {
    render() {
      return (
        <div className="Browse">
          <NavBar {...this.props}/>
          <DescriptionUser {...this.props}/>
          <Footer/>
        </div>
      );
    }
  }


export default Browse;

