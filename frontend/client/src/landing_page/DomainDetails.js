import React from 'react';
import TopWelcome from './TopWelcome.js'
import DescriptionBrowse from './DescriptionBrowse.js'
import BrowseList from './BrowseList.js'
import Footer from './Footer.js'
import './App2.scss';
import './DomainDetails.scss';


class Details extends React.Component{

  

    render() {
        return (
        <div className="Details" >
        <h1>agh.edu.pl</h1>
        <div className="Opinions">
            <h4>Not recommended</h4>
            <p>I don't trust this domain. It looks suspicious for me.</p>
            <h4>Spy content</h4>
            <p>Be careful! It contains some spying stuff.</p>
        </div>
        </div>
        )
    }
}

class DomainDetails extends React.Component {
    render() {
      return (
        <div className="DomainDetails">
          <TopWelcome/>
          <Details/>
          <Footer/>
        </div>
      );
    }
  }


export default DomainDetails;