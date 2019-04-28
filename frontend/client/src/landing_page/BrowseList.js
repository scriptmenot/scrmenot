import React from 'react';
import './BrowseList.scss';
import './DomainDetails.js'
import { withRouter } from "react-router";

class BrowseList extends React.Component {
 state = {
      domains: [], 
      dom: []
  };

  details(domain){
   
    this.props.history.push({
        pathname: '/details',
        state: { dom: domain }
      });

  }

    componentDidMount() {
     fetch('https://fathomless-brushlands-42192.herokuapp.com/api/domain')
    .then(resp => resp.json())
      .then(resp => {
        this.setState({domains: Array.from(resp)});
      })
  }

    
  render() {
    return (
      <div className="BrowseList">
        <ul className="DomainsList" on={this.getSearchedNames}> 
              {this.state.domains.map((domain, i) => 
              <li key={i} onClick={this.details.bind(this, domain)}>{domain.uri}</li>
            )}
          </ul>
      </div>
    )
  }
}

export default withRouter(BrowseList);