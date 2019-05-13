import React from 'react';
import './BlocksContainer.scss';

class SearchDomain extends React.Component {
    state = {
        name: "",
        domains: [], 
        dom: ""
    };
  
    getSearchedNames() {
  
      fetch(`https://fathomless-brushlands-42192.herokuapp.com/api/domain/uri/${this.state.name}`)
      .then(resp => resp.json())
        .then(resp => {
          this.setState({domains: Array.from(resp)});
          this.setState({domains: this.state.domains.filter(el => el.uri.startsWith(this.state.name))});
        })
    }
  
    handleNameChange(e) {
      this.setState({name: e.target.value}, () => {
        if(this.state.name !== "")
          this.getSearchedNames();
        else
          this.setState({domains: []});
      });
  
    }
  
    chooseDomain(domain) {
      this.props.history.push({
        pathname: '/details',
        state: { dom: domain }
      });
    }
  
    render(){
      return (
        <li className="SearchDomainBlock"> 
  
          <form className="SearchForm">
  
            <input type="search" placeholder="Search domain" id="searchInput" onChange={this.handleNameChange.bind(this)}/>
            <img src={require('./images/magnifying-glass.png')} alt="maginifying-glass" id="searchButton"/>
            <ul className="Suggestions" >          
                {this.state.domains.map((domain, i) => 
                <li key={i} onClick={this.chooseDomain.bind(this, domain)}>{domain.uri}</li>
              )}
            </ul>
          </form>
  
        </li>
      )
    }
  }

  export default SearchDomain;