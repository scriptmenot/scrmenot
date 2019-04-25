import React from 'react';
import './BlocksContainer.scss';
import Modal from 'react-responsive-modal';
import { Redirect, Link, withRouter } from 'react-router-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Browse from './Browse';

class AddDomain extends React.Component {
  state = {
    open: false,
    name: "",
    comment: ""
  };

  handleNameChange(e){
    this.setState({name: e.target.value});
 };

 handleCommentChange(e){
  this.setState({comment: e.target.value});
};

handleAdding(e){
  e.preventDefault();
  console.log("name: " + this.state.name);
  console.log("comment: " + this.state.comment);

  const data = {"uri": this.state.name};

  fetch("https://fathomless-brushlands-42192.herokuapp.com/api/domain", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

  onOpenModal(){
    this.setState({ open: true });
  };

  onCloseModal(){
    this.setState({ open: false });
  };
    render() {
      const { open } = this.state;
      const modalStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        modal: {
          border: 'none',
          background: '#297058',
          width: '70vw',
          height: '50vh',
          textAlign: 'center',
          fontSize: '1.5vw',
          position: 'relative',
        },
        closeIcon: {cursor:'pointer'}
      }

      const formStyles = {
        display: 'grid', 
        height: '100%',
        gridTemplateColumns:  '2% 96% 2%',
        gridTemplateRows: '10% 15% 15% 20% 20% 10% 10%'
      }

      const firstHeaderStyles = {
        gridArea: '2/2/3/3'
      }

      const domainNameStyles = {
        width:'40%', 
        height:'4vh', 
        gridArea: '3/2/4/3', 
        display:'block', 
        marginLeft:'auto', 
        marginRight:'auto'
      }
      const secondHeaderStyles = {
        padding: '4%', 
        gridArea: '4/2/5/3'
      }

      const commentStyles = {
        gridArea: '5/2/7/3', 
        width:'60%', 
        bottom: '10px', 
        display:'block', 
        marginLeft:'auto', 
        marginRight:'auto',
        fontFamily: 'Raleway'
      }

      const submitStyles = {
        gridArea: '6/3/7/4', 
        marginLeft:'-8vw', 
        width: '6vw',
        backgroundColor: '#fdedb3',
        border: 'none',
        cursor: 'pointer'
      }
      return (
        <React.Fragment>

          <li className="AddDomainBlock" onClick={this.onOpenModal.bind(this)}>
                <img src={require('./plus.png')} alt="plus"/>
          </li>

          <Modal open={open} onClose={this.onCloseModal.bind(this)}  styles={modalStyles} little>

            <form id="addDomainForm" style={formStyles}  onSubmit={this.handleAdding}>

              <h4 style={firstHeaderStyles}>Type domain address</h4>
              <input style={domainNameStyles} type="text" id="newDomainURL" value={this.state.name} onChange={this.handleNameChange} required/>
              <h4 style={secondHeaderStyles}>Why do you find it dangerous?</h4>
              <textarea  id="newDomainComment"  style={commentStyles} placeholder='Type some comment' value={this.state.comment} onChange={this.handleCommentChange} required></textarea>
              <input type="submit" style={submitStyles} value="Add"/>

            </form>

          </Modal>
          
        </React.Fragment>
      )
  }
}

class SearchDomain extends React.Component {
  state = {
      name: "",
      domains: []
  };

  getSearchedNames() {

    fetch(`https://fathomless-brushlands-42192.herokuapp.com/api/domain/uri/${this.state.name}`)
    .then(resp => resp.json())
      .then(resp => {
        this.setState({domains: Array.from(resp)});
        const regex = new RegExp(this.state.name, 'gi');
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

  render(){
    return (
      <li className="SearchDomainBlock"> 

        <form className="SearchForm">

          <input type="search" placeholder="Search domain" id="searchInput" onChange={this.handleNameChange.bind(this)}/>
          <img src={require('./magnifying-glass.png')} alt="maginifying-glass" id="searchButton"/>
          <ul className="Suggestions" >          
              {this.state.domains.map((domain, i) => 
              <li key={i}>{domain.uri}</li>
            )}
          </ul>
        </form>

      </li>
    )
  }
}

class TopDomains extends React.Component {
  render(){
    return (
      <li className="TopDomains">
        <img src={require('./five.png')} alt="folder"/>
      </li>
    )
  }
}



class BrowseCatalogue extends React.Component {

  state = {
    navigate: false
  }

  handlePageChange = () => {
    this.props.history.push('/browse');
    return <Redirect to='/browse' />
  }

  render(){
    return (
      <li className="BrowseCatalogueBlock" onClick={this.handlePageChange} >
      
        <img src={require('./folder.png')} alt="folder"/>
      
      </li>
    )
  }
}


class BlocksContainer extends React.Component {
    render(){
      return (
          <ul className="BlocksContainer">
            <AddDomain/>
            <SearchDomain/>
            <TopDomains/>
            <BrowseCatalogue {...this.props}/>
          </ul>
      )

    }
}



export default BlocksContainer;