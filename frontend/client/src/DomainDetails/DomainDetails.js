import React from 'react';
import TopWelcome from '../LandingPage/PageParts/TopWelcome.js'
import Footer from '../LandingPage/PageParts/Footer.js'
import Details from './Details.js'
import './DomainDetails.scss';

class DomainDetails extends React.Component {
    render() {
      return (
        <div className="DomainDetails">
          <TopWelcome/>
          <Details {...this.props}/>
          <Footer/>
        </div>
      )
    }
  }


export default DomainDetails;