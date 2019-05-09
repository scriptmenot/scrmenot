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
      opinions:[],
      opinionTitle: "",
      opinionContent: "",
      isSafe: false
    };
  }

  componentDidMount() {
    fetch(`https://fathomless-brushlands-42192.herokuapp.com/api/opinion/domain/${this.props.location.state.dom.id}`)
   .then(resp => resp.json())
     .then(resp => {
      this.setState({ opinions: Array.from(resp) });
        });
  }
  handleOpinionTitleChange(e){
    this.setState({opinionTitle: e.target.value});
  };

  handleOpinionContentChange(e){
    this.setState({opinionContent: e.target.value});
  };

  handleSecurityLevel(e){
    this.setState({
        isSafe : e.target.value
     })
 } 

  handleAdding(e){
    e.preventDefault();
  
    const data = {
      "content": this.state.opinionContent,
      "domainId": this.state.domainId,
      "title": this.state.opinionTitle,
      "isSafe": this.state.isSafe
    };

    console.log(data);
  
    fetch("https://fathomless-brushlands-42192.herokuapp.com/api/opinion", {
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

  sendVote(voteData){

    fetch("https://fathomless-brushlands-42192.herokuapp.com/api/opinion/vote", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(voteData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  voteUp(opinionId){

    const data = {"isUpvote": true, "opinionId": opinionId};
    this.sendVote(data);
  }

  voteDown(opinionId){

    const data = {"isUpvote": false, "opinionId": opinionId};
    this.sendVote(data);
  }

  addOpinion(){

  }

    render() {
        return (
        <div className="Details" >
          <h1>{this.state.domainUri}
          </h1>
          <div className="Opinions">

            {this.state.opinions.length ?
              this.state.opinions.map((opinion, index) => {
              return <div>
                    <img src={require('./user.png')} alt="user" />
                    <h4>{opinion.title}</h4>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQyIDQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MiA0MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNFRDhBMTk7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB4MT0iNDIiIHkxPSIyMSIgeDI9IjAiIHkyPSIyMSIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="minus" id="voteSign" onClick={this.voteDown.bind(this, opinion.id)}/>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQyIDQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MiA0MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMyM0EyNEQ7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB4MT0iMjEiIHkxPSIwIiB4Mj0iMjEiIHkyPSI0MiIvPgo8bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMjNBMjREO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgeDE9IjQyIiB5MT0iMjEiIHgyPSIwIiB5Mj0iMjEiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt="plus" id="voteSign" onClick={this.voteUp.bind(this, opinion.id)}/>
                    <p key={index}>{opinion.content}</p>
                    </div>;
            }) :
              <p>This domain has no opinion so far</p>

            }
          </div>
           
          <div className="addOpinion">
          <p>Would you like to share Your opinion?</p>
            <input type="text" placeholder="Type a title of Your opinion" id="opinionTitle" value={this.state.opinionTitle} onChange={this.handleOpinionTitleChange.bind(this)} />
            <textarea id="opinionTextArea" value={this.state.opinionContent} onChange={this.handleOpinionContentChange.bind(this)}>Type something</textarea>
            <div className="safeOrDangerous" >
              <label><input type="radio" name="isSafe" value={true} onChange={this.handleSecurityLevel.bind(this)} required/> Safe</label>
              <label><input type="radio" name="isSafe" value={false} onChange={this.handleSecurityLevel.bind(this)}/> Dangerous</label>
              <button id="addOpinionButton" onClick={this.handleAdding.bind(this)}>Add </button>
            </div>
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