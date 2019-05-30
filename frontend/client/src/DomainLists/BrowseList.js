import React from 'react';
import './BrowseList.scss';
import '../DomainDetails/DomainDetails.js';
import Loader from './Loader.js';
import { withRouter } from "react-router";
const moment = require('moment');

class BrowseList extends React.Component {
 state = {
      domains: [], 
      dom: [],
      isLoading: false
  };

  details(domain){
   
    this.props.history.push({
        pathname: '/details',
        state: { dom: domain }
      });

  }

    componentDidMount() {

     this.setState({ isLoading: true });

     fetch('https://scrmenotlogin.herokuapp.com/api/domain')
    .then(resp => resp.json())
      .then(resp => {
        this.setState({
          domains: Array.from(resp), 
          isLoading: false
        });
      })
  }

    
  render() {
  
    return (
      <div className="BrowseList">
        <ul className="DomainsList">
        {
          this.state.isLoading 
          ?
          <Loader/>
          :
          this.state.domains.map((domain, i) => 
            <div className="SummaryList">
              <div key={i} className="safety">
                <div className="mini-counts">{domain.safety}</div>
                    <div>safety</div>
                </div>
          <div className="Time">Added {moment(domain.createdAt).fromNow()}</div>
          <div className="Name">
            <li key={i} onClick={this.details.bind(this, domain)}>{domain.uri}</li>  
          </div>   
          </div>   
      )}
      </ul>
      </div>
    )
  }
}

export default withRouter(BrowseList);