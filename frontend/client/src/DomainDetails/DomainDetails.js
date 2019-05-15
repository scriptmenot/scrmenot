import React from 'react';
import NavBar from '../LandingPage/PageParts/NavBar.js'
import Footer from '../LandingPage/PageParts/Footer.js'
import Details from './Details.js'
import './DomainDetails.scss';

class DomainDetails extends React.Component {
    render() {
      return (
        <div className="DomainDetails">
          <NavBar/>
          <Details {...this.props}/>
          <Footer/>
        </div>
      )
    }
  }


export default DomainDetails;