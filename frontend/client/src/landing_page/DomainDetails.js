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

  componentDidUpdate() {
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
  
    fetch("https://fathomless-brushlands-42192.herokuapp.com/api/opinion", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          opinionTitle: "",
        opinionContent: ""
        });
      })
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

  deleteOpinion(opinionId){
    console.log(opinionId);
    return fetch("https://fathomless-brushlands-42192.herokuapp.com/api/opinion/" + opinionId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((res) => res.text())
    .then((text) => text.length ? JSON.parse(text) : {})
    .catch((error) => {
      throw error;
    });
  }

    render() {
        return (
        <div className="Details" >
          <h1>{this.state.domainUri}
          </h1>
          <div className="Opinions">

            {this.state.opinions.length ?
              this.state.opinions.map((opinion, index) => {
              return <div className="oneOpinion">
                    <img src={require('./user.png')} alt="user" />
                    <h4>{opinion.title}</h4>
<<<<<<< HEAD
                    <span className="editingOperations">
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDAgMzAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTQ5Ljk5NiwwQzY3LjE1NywwLDAuMDAxLDY3LjE2MSwwLjAwMSwxNDkuOTk3UzY3LjE1NywzMDAsMTQ5Ljk5NiwzMDBzMTUwLjAwMy02Ny4xNjMsMTUwLjAwMy0xNTAuMDAzICAgIFMyMzIuODM1LDAsMTQ5Ljk5NiwweiBNMjIxLjMwMiwxMDcuOTQ1bC0xNC4yNDcsMTQuMjQ3bC0yOS4wMDEtMjguOTk5bC0xMS4wMDIsMTEuMDAybDI5LjAwMSwyOS4wMDFsLTcxLjEzMiw3MS4xMjYgICAgbC0yOC45OTktMjguOTk2TDg0LjkyLDE4Ni4zMjhsMjguOTk5LDI4Ljk5OWwtNy4wODgsNy4wODhsLTAuMTM1LTAuMTM1Yy0wLjc4NiwxLjI5NC0yLjA2NCwyLjIzOC0zLjU4MiwyLjU3NWwtMjcuMDQzLDYuMDMgICAgYy0wLjQwNSwwLjA5MS0wLjgxNywwLjEzNS0xLjIyNCwwLjEzNWMtMS40NzYsMC0yLjkxLTAuNTgxLTMuOTczLTEuNjQ3Yy0xLjM2NC0xLjM1OS0xLjkzMi0zLjMyMi0xLjUxMi01LjIwM2w2LjAyNy0yNy4wMzUgICAgYzAuMzQtMS41MTcsMS4yODYtMi43OTgsMi41NzgtMy41ODJsLTAuMTM3LTAuMTM3TDE5Mi4zLDc4Ljk0MWMxLjY3OC0xLjY3NSw0LjQwNC0xLjY3NSw2LjA4MiwwLjAwNWwyMi45MjIsMjIuOTE3ICAgIEMyMjIuOTgyLDEwMy41NDEsMjIyLjk4MiwxMDYuMjY3LDIyMS4zMDIsMTA3Ljk0NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="edit" id="edit"/>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMTI4IDE2OGgxOTJ2LTE2aC0xOTJ6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0yMjQgMGMtMTIzLjcxMDkzOCAwLTIyNCAxMDAuMjg5MDYyLTIyNCAyMjRzMTAwLjI4OTA2MiAyMjQgMjI0IDIyNCAyMjQtMTAwLjI4OTA2MiAyMjQtMjI0Yy0uMTQwNjI1LTEyMy42NTIzNDQtMTAwLjM0NzY1Ni0yMjMuODU5Mzc1LTIyNC0yMjR6bTExMiAxNzZjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtOC43NjE3MTlsLTE1LjIzODI4MSAxNTIuODAwNzgxYy0uNDE0MDYyIDQuMTAxNTYzLTMuODc1IDcuMjE4NzUtOCA3LjE5OTIxOWgtMTQ0Yy00LjEyNS4wMTk1MzEtNy41ODU5MzgtMy4wOTc2NTYtOC03LjE5OTIxOWwtMTUuMTk5MjE5LTE1Mi44MDA3ODFoLTguODAwNzgxYy00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04di0zMmMwLTQuNDE3OTY5IDMuNTgyMDMxLTggOC04aDgxLjQ3MjY1NmMtLjk0OTIxOC0yLjU2MjUtMS40NDUzMTItNS4yNjk1MzEtMS40NzI2NTYtOCAwLTEzLjI1MzkwNiAxMC43NDYwOTQtMjQgMjQtMjRzMjQgMTAuNzQ2MDk0IDI0IDI0Yy0uMDI3MzQ0IDIuNzMwNDY5LS41MjM0MzggNS40Mzc1LTEuNDcyNjU2IDhoODEuNDcyNjU2YzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDh6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0xNTkuMjM4MjgxIDMyOGgxMjkuNTYyNWwxNC4zOTg0MzgtMTQ0aC0xNTguMzU5Mzc1em05Ni44MDA3ODEtMTA0Ljk5MjE4OGMuMjkyOTY5LTIuODg2NzE4IDIuMTI1LTUuMzkwNjI0IDQuNzkyOTY5LTYuNTQyOTY4IDIuNjY0MDYzLTEuMTQ4NDM4IDUuNzQ2MDk0LS43NjE3MTkgOC4wNDY4NzUgMS4wMDc4MTIgMi4zMDA3ODIgMS43Njk1MzIgMy40NjA5MzggNC42NDg0MzggMy4wMzEyNSA3LjUxOTUzMmwtOCA2NGMtLjQ5NjA5NCAzLjk5MjE4Ny0zLjg4NjcxOCA2Ljk5NjA5My03LjkxMDE1NiA3LjAwNzgxMi0uMzM1OTM4IDAtLjY2Nzk2OS0uMDIzNDM4LTEtLjA2MjUtNC4zODI4MTItLjU1MDc4MS03LjQ5MjE4OC00LjU0Njg3NS02Ljk0NTMxMi04LjkyOTY4OHptLTQwLjAzOTA2Mi45OTIxODhjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOHM4IDMuNTgyMDMxIDggOHY2NGMwIDQuNDE3OTY5LTMuNTgyMDMxIDgtOCA4cy04LTMuNTgyMDMxLTgtOHptLTMyLjk5MjE4OC03LjkzNzVjNC4zODI4MTMtLjU0Njg3NSA4LjM3ODkwNyAyLjU2MjUgOC45Mjk2ODggNi45NDUzMTJsOCA2NGMuNTQ2ODc1IDQuMzgyODEzLTIuNTYyNSA4LjM3ODkwNy02Ljk0NTMxMiA4LjkyOTY4OC0uMzI4MTI2LjAzOTA2Mi0uNjYwMTU3LjA1ODU5NC0uOTkyMTg4LjA2MjUtNC4wMzEyNS0uMDAzOTA2LTcuNDI5Njg4LTMuMDA3ODEyLTcuOTI5Njg4LTcuMDA3ODEybC04LTY0Yy0uNTQ2ODc0LTQuMzc4OTA3IDIuNTU4NTk0LTguMzc1IDYuOTM3NS04LjkyOTY4OHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTIzMiAxMjhjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOHMtOC0zLjU4MjAzMS04LTggMy41ODIwMzEtOCA4LTggOCAzLjU4MjAzMSA4IDh6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjwvc3ZnPgo=" alt="delete" id="delete" onClick={this.deleteOpinion.bind(this, opinion.id)}/>
                    </span>
=======
                    <div class="voteCounter">{opinion.rate}</div>
>>>>>>> c2841bf622e6669195d972e6a4f105b7211ad93e
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQyIDQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MiA0MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNFRDhBMTk7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB4MT0iNDIiIHkxPSIyMSIgeDI9IjAiIHkyPSIyMSIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="minus" id="voteSign" onClick={this.voteDown.bind(this, opinion.id)}/>
                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQyIDQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA0MiA0MjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxsaW5lIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMyM0EyNEQ7c3Ryb2tlLXdpZHRoOjI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7IiB4MT0iMjEiIHkxPSIwIiB4Mj0iMjEiIHkyPSI0MiIvPgo8bGluZSBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojMjNBMjREO3N0cm9rZS13aWR0aDoyO3N0cm9rZS1taXRlcmxpbWl0OjEwOyIgeDE9IjQyIiB5MT0iMjEiIHgyPSIwIiB5Mj0iMjEiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt="plus" id="voteSign" onClick={this.voteUp.bind(this, opinion.id)}/><br/>
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