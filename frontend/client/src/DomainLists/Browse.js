import React from 'react';
import NavBar from '../LandingPage/PageParts/NavBar.js'
import DescriptionBrowse from './DescriptionBrowse.js'
import BrowseList from './BrowseList.js'
import Footer from '../LandingPage/PageParts/Footer.js'
import './App2.scss';


class Browse extends React.Component {
    render() {
      return (
        <div className="Browse">
          <NavBar {...this.props}/>
          <DescriptionBrowse/>
          <BrowseList {...this.props}/>
          <Footer/>
        </div>
      );
    }
  }


export default Browse;

