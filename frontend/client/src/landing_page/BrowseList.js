import React from 'react';
import './BrowseList.scss';
import { Redirect, Link, withRouter } from 'react-router-dom';

class BrowseList extends React.Component {
 state = {
      domains: [], 
      dom: []
  };

  details(domain){
   
      this.props.history.push('/details');
      return <Redirect to={{
        pathname: '/details',
        state: {dom: "test"}
    }}/>
      //console.log(domain);
    
  }

    componentDidMount() {
     fetch('https://fathomless-brushlands-42192.herokuapp.com/api/domain')
    .then(resp => resp.json())
      .then(resp => {
        this.setState({domains: Array.from(resp)});
        console.log(this.state.domains);
      })
  }

    
  render() {
    return (
      <div className="BrowseList">
        <ul className="DomainsList" on={this.getSearchedNames}> 
              {this.state.domains.map((domain, i) => 
              <li key={i} onClick={()=>this.details(domain)}>{domain.uri}</li>
            )}
          </ul>
      </div>
    )
  }
}

export default BrowseList;