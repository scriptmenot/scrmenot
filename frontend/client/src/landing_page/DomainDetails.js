import React from 'react';
import TopWelcome from './TopWelcome.js'
import Footer from './Footer.js'
import './App2.scss';
import './DomainDetails.scss';

class Details extends React.Component{

  constructor(props) {
    super(props);
    this.state = {    
      domainUri: this.props.location.state.dom.uri,
      domainId: this.props.location.state.dom.id,
      opinions:[]
    };
  }

  componentDidMount() {
    fetch(`https://fathomless-brushlands-42192.herokuapp.com/api/opinion/domain/${this.props.location.state.dom.id}`)
   .then(resp => resp.json())
     .then(resp => {
      this.setState({ opinions: Array.from(resp) });
        });
  }

    render() {
        return (
        <div className="Details" >
        <h1>{this.state.domainUri}</h1>
        <div className="Opinions">

          {this.state.opinions.length ?
            this.state.opinions.map((opinion, index) => {
            return <div>
                  <img src={require('./user.png')} alt="user" />
                  <h4>{opinion.title}</h4>
                  <p key={index}>{opinion.content}</p>
                  </div>;
          }) :
            <p>This domain has no opinion so far</p>

          }
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
          <Details {...this.props}/>
          <Footer/>
        </div>
      )
    }
  }


export default DomainDetails;