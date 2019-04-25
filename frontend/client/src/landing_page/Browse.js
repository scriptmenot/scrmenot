import React from 'react';
import TopWelcome from './TopWelcome.js'
import DescriptionBrowse from './DescriptionBrowse.js'
import BrowseList from './BrowseList.js'
import Footer from './Footer.js'
import './App2.scss';

class Browse extends React.Component {
    render() {
      return (
        <div className="Browse">
          <TopWelcome/>
          <DescriptionBrowse/>
          <BrowseList {...this.props}/>
          <Footer/>
        </div>
      );
    }
  }


export default Browse;

