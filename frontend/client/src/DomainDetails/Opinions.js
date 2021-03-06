import React from 'react';
import './DomainDetails.scss';
import Comments from './Comments.js';
import Modal from 'react-responsive-modal';
import Loader from '../DomainLists/Loader.js';
import AuthService from '../AuthService/AuthService.js';
import Login from '../LoginRegister/Login.js';
import Register from '../LoginRegister/Register.js';

class Opinions extends React.Component{

    _isMounted = false;
  
    constructor(props) {
      super(props);
      this.Auth = new AuthService();
      this.isOpinionAuthor = this.isOpinionAuthor.bind(this);
      this.state = {    
        domainUri: this.props.location.state.dom.uri,
        domainId: this.props.location.state.dom.id,
        domainSafety: this.props.location.state.dom.safety,
        opinions:[],
        isCommentClicked: false,
        selectedOpinionId: "",
        editOpinionMode: false,
        editedOpinionContent: "",
        editedOpinionTitle: "",
        isLoading: false,
        openLoginModal: false,
        openRegisterModal: false,
        open: false,
      };
    }

    loadOpinions(){
        
      fetch(`https://scrmenotlogin.herokuapp.com/api/opinion/domain/${this.props.location.state.dom.id}`)
        .then(resp => resp.json())
          .then(resp => {
            if (this._isMounted) {
              this.setState({ 
                opinions: Array.from(resp),
              isLoading: false 
            });
            }

      });
    }
  
    componentDidMount() {
  
      this._isMounted = true;
      this.setState({ isLoading: true });
      this.loadOpinions();

    }
  
    componentDidUpdate() {
      this.loadOpinions(); 
    }
  
    componentWillUnmount() {
      this._isMounted = false;
    }
 
    openLoginModal(){
      this.setState({openLoginModal: true,  open: false})
    }
    closeLoginModal(){
      this.setState({openLoginModal: false})
    }
    
    openRegisterModal(){
      this.setState({openRegisterModal: true,  open: false})
    }
    closeRegisterModal(){
      this.setState({openRegisterModal: false})
    }
    
    onOpenModal(){
        this.setState({ open2: true });
    };
    
    onCloseModal(){
      this.setState({ open: false, open2: false});
    };
    
    sendVote(voteData){
  
      fetch("https://scrmenotlogin.herokuapp.com/api/opinion/vote", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.Auth.getToken()
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

    addCommentField(opinionIndex){
      if(this.Auth.loggedIn()){
        if(this.state.isCommentClicked)
        this.setState({
          isCommentClicked: false
        })

        else
          this.setState({
            isCommentClicked: true,
            selectedOpinionId: opinionIndex,
            editOpinionMode: false
          })
      }
      else{
        this.setState({open: true});
      }
    }

    editOpinion(opinionIndex){

      if(this.state.editOpinionMode && this.state.selectedOpinionId === opinionIndex)
      {
        this.setState({editOpinionMode: false});
      }
      else 
        this.setState({
          editOpinionMode: true, 
          selectedOpinionId: opinionIndex,
          isCommentClicked: false
        });
    }

    deleteOpinion(opinionId){

        return fetch("https://scrmenotlogin.herokuapp.com/api/opinion/" + opinionId, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.Auth.getToken()
          },
        })
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .catch((error) => {
          throw error;
        });
      
    }

    handleEditedOpinionTitleSave(e){
      this.setState({
        editedOpinionTitle: e.target.value
      })
    }

    handleEditedOpinionContentSave(e){
     
      this.setState({
        editedOpinionContent: e.target.value
      })
    }

    handleEditedOpinionAdd(oldOpinionTitle, oldOpinionContent, e){
      e.preventDefault();
      
      const data = {
        "title": this.state.editedOpinionTitle !== oldOpinionTitle && this.state.editedOpinionTitle !== "" ? this.state.editedOpinionTitle : oldOpinionTitle,
        "content": this.state.editedOpinionContent !== oldOpinionContent && this.state.editedOpinionContent !== "" ? this.state.editedOpinionContent : oldOpinionContent
      };

        fetch(`https://scrmenotlogin.herokuapp.com/api/opinion/${this.state.selectedOpinionId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.Auth.getToken()
          },
          body: JSON.stringify(data)
        })
        .then((res) =>{
          res.text();
          this.setState({ editOpinionMode: false});
        })
        .catch((error) => {
          throw error;
        });
      
    }
  
    isOpinionAuthor(opinionAuthorId){
      return opinionAuthorId == localStorage.getItem('userId');
    }
  
    render() {

      const modalStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)'
        },
        modal: {
          border: 'none',
          background: '#297058',
          width: '50vw',
          height: '40vh',
          textAlign: 'center',
          fontSize: '1.5vw',
          position: 'relative',
        },
        closeIcon: {cursor:'pointer'}
      }

      return (
        <React.Fragment>
        
          <h1>{this.state.domainUri}
          </h1>
          <div className="Safety">
          <span><p>Safety level</p></span>
          {this.state.domainSafety}</div>
          <div className="Opinions">
                {
                  this.state.isLoading 
                  ?
                  <Loader/>
                  :
                  this.state.opinions.length ?
                  this.state.opinions.slice(0).reverse().map((opinion, index) => {
                  return <div>
                          <div className="oneOpinion">
                          <img src={require('./user.png')} alt="user" />
                          <span className="editingOperations">
                          {this.Auth.loggedIn() && this.isOpinionAuthor(opinion.userId) ? 
                          <React.Fragment>
                            <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDAgMzAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTQ5Ljk5NiwwQzY3LjE1NywwLDAuMDAxLDY3LjE2MSwwLjAwMSwxNDkuOTk3UzY3LjE1NywzMDAsMTQ5Ljk5NiwzMDBzMTUwLjAwMy02Ny4xNjMsMTUwLjAwMy0xNTAuMDAzICAgIFMyMzIuODM1LDAsMTQ5Ljk5NiwweiBNMjIxLjMwMiwxMDcuOTQ1bC0xNC4yNDcsMTQuMjQ3bC0yOS4wMDEtMjguOTk5bC0xMS4wMDIsMTEuMDAybDI5LjAwMSwyOS4wMDFsLTcxLjEzMiw3MS4xMjYgICAgbC0yOC45OTktMjguOTk2TDg0LjkyLDE4Ni4zMjhsMjguOTk5LDI4Ljk5OWwtNy4wODgsNy4wODhsLTAuMTM1LTAuMTM1Yy0wLjc4NiwxLjI5NC0yLjA2NCwyLjIzOC0zLjU4MiwyLjU3NWwtMjcuMDQzLDYuMDMgICAgYy0wLjQwNSwwLjA5MS0wLjgxNywwLjEzNS0xLjIyNCwwLjEzNWMtMS40NzYsMC0yLjkxLTAuNTgxLTMuOTczLTEuNjQ3Yy0xLjM2NC0xLjM1OS0xLjkzMi0zLjMyMi0xLjUxMi01LjIwM2w2LjAyNy0yNy4wMzUgICAgYzAuMzQtMS41MTcsMS4yODYtMi43OTgsMi41NzgtMy41ODJsLTAuMTM3LTAuMTM3TDE5Mi4zLDc4Ljk0MWMxLjY3OC0xLjY3NSw0LjQwNC0xLjY3NSw2LjA4MiwwLjAwNWwyMi45MjIsMjIuOTE3ICAgIEMyMjIuOTgyLDEwMy41NDEsMjIyLjk4MiwxMDYuMjY3LDIyMS4zMDIsMTA3Ljk0NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="edit" id="edit" onClick={this.editOpinion.bind(this, opinion.id)}/>
                            <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMTI4IDE2OGgxOTJ2LTE2aC0xOTJ6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0yMjQgMGMtMTIzLjcxMDkzOCAwLTIyNCAxMDAuMjg5MDYyLTIyNCAyMjRzMTAwLjI4OTA2MiAyMjQgMjI0IDIyNCAyMjQtMTAwLjI4OTA2MiAyMjQtMjI0Yy0uMTQwNjI1LTEyMy42NTIzNDQtMTAwLjM0NzY1Ni0yMjMuODU5Mzc1LTIyNC0yMjR6bTExMiAxNzZjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtOC43NjE3MTlsLTE1LjIzODI4MSAxNTIuODAwNzgxYy0uNDE0MDYyIDQuMTAxNTYzLTMuODc1IDcuMjE4NzUtOCA3LjE5OTIxOWgtMTQ0Yy00LjEyNS4wMTk1MzEtNy41ODU5MzgtMy4wOTc2NTYtOC03LjE5OTIxOWwtMTUuMTk5MjE5LTE1Mi44MDA3ODFoLTguODAwNzgxYy00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04di0zMmMwLTQuNDE3OTY5IDMuNTgyMDMxLTggOC04aDgxLjQ3MjY1NmMtLjk0OTIxOC0yLjU2MjUtMS40NDUzMTItNS4yNjk1MzEtMS40NzI2NTYtOCAwLTEzLjI1MzkwNiAxMC43NDYwOTQtMjQgMjQtMjRzMjQgMTAuNzQ2MDk0IDI0IDI0Yy0uMDI3MzQ0IDIuNzMwNDY5LS41MjM0MzggNS40Mzc1LTEuNDcyNjU2IDhoODEuNDcyNjU2YzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDh6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0xNTkuMjM4MjgxIDMyOGgxMjkuNTYyNWwxNC4zOTg0MzgtMTQ0aC0xNTguMzU5Mzc1em05Ni44MDA3ODEtMTA0Ljk5MjE4OGMuMjkyOTY5LTIuODg2NzE4IDIuMTI1LTUuMzkwNjI0IDQuNzkyOTY5LTYuNTQyOTY4IDIuNjY0MDYzLTEuMTQ4NDM4IDUuNzQ2MDk0LS43NjE3MTkgOC4wNDY4NzUgMS4wMDc4MTIgMi4zMDA3ODIgMS43Njk1MzIgMy40NjA5MzggNC42NDg0MzggMy4wMzEyNSA3LjUxOTUzMmwtOCA2NGMtLjQ5NjA5NCAzLjk5MjE4Ny0zLjg4NjcxOCA2Ljk5NjA5My03LjkxMDE1NiA3LjAwNzgxMi0uMzM1OTM4IDAtLjY2Nzk2OS0uMDIzNDM4LTEtLjA2MjUtNC4zODI4MTItLjU1MDc4MS03LjQ5MjE4OC00LjU0Njg3NS02Ljk0NTMxMi04LjkyOTY4OHptLTQwLjAzOTA2Mi45OTIxODhjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOHM4IDMuNTgyMDMxIDggOHY2NGMwIDQuNDE3OTY5LTMuNTgyMDMxIDgtOCA4cy04LTMuNTgyMDMxLTgtOHptLTMyLjk5MjE4OC03LjkzNzVjNC4zODI4MTMtLjU0Njg3NSA4LjM3ODkwNyAyLjU2MjUgOC45Mjk2ODggNi45NDUzMTJsOCA2NGMuNTQ2ODc1IDQuMzgyODEzLTIuNTYyNSA4LjM3ODkwNy02Ljk0NTMxMiA4LjkyOTY4OC0uMzI4MTI2LjAzOTA2Mi0uNjYwMTU3LjA1ODU5NC0uOTkyMTg4LjA2MjUtNC4wMzEyNS0uMDAzOTA2LTcuNDI5Njg4LTMuMDA3ODEyLTcuOTI5Njg4LTcuMDA3ODEybC04LTY0Yy0uNTQ2ODc0LTQuMzc4OTA3IDIuNTU4NTk0LTguMzc1IDYuOTM3NS04LjkyOTY4OHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTIzMiAxMjhjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOHMtOC0zLjU4MjAzMS04LTggMy41ODIwMzEtOCA4LTggOCAzLjU4MjAzMSA4IDh6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjwvc3ZnPgo=" alt="delete" id="delete" onClick={this.deleteOpinion.bind(this, opinion.id)}/>
                            </React.Fragment>
                            : null}
                            <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDYwIDYwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA2MCA2MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxwYXRoIGQ9Ik0zMCwxLjVjLTE2LjU0MiwwLTMwLDEyLjExMi0zMCwyN2MwLDUuMjA0LDEuNjQ2LDEwLjI0NSw0Ljc2OCwxNC42MDRjLTAuNTkxLDYuNTM3LTIuMTc1LDExLjM5LTQuNDc1LDEzLjY4OSAgYy0wLjMwNCwwLjMwNC0wLjM4LDAuNzY5LTAuMTg4LDEuMTUzQzAuMjc1LDU4LjI4OSwwLjYyNSw1OC41LDEsNTguNWMwLjA0NiwwLDAuMDkyLTAuMDAzLDAuMTM5LTAuMDEgIGMwLjQwNS0wLjA1Nyw5LjgxMy0xLjQxMSwxNi42MTgtNS4zMzlDMjEuNjIxLDU0LjcxLDI1LjczNyw1NS41LDMwLDU1LjVjMTYuNTQyLDAsMzAtMTIuMTEyLDMwLTI3UzQ2LjU0MiwxLjUsMzAsMS41eiBNMTYsMzIuNSAgYy0yLjIwNiwwLTQtMS43OTQtNC00czEuNzk0LTQsNC00czQsMS43OTQsNCw0UzE4LjIwNiwzMi41LDE2LDMyLjV6IE0zMCwzMi41Yy0yLjIwNiwwLTQtMS43OTQtNC00czEuNzk0LTQsNC00czQsMS43OTQsNCw0ICBTMzIuMjA2LDMyLjUsMzAsMzIuNXogTTQ0LDMyLjVjLTIuMjA2LDAtNC0xLjc5NC00LTRzMS43OTQtNCw0LTRzNCwxLjc5NCw0LDRTNDYuMjA2LDMyLjUsNDQsMzIuNXoiIGZpbGw9IiMwMDAwMDAiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt="comment" id="comment" onClick={this.addCommentField.bind(this, opinion.id)}/>
                          </span>
                          <span className="grading">
                          
                            <button class="js-vote-up-btn grid--cell s-btn s-btn__unset c-pointer" title="This answer is useful" aria-pressed="false" aria-label="up vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36" onClick={this.voteUp.bind(this, opinion.id)}><path d="M2 26h32L18 10 2 26z"></path></svg></button>
          
                            <div class="js-vote-count grid--cell fc-black-500 fs-title grid fd-column ai-center" itemprop="upvoteCount" data-value="2">{opinion.rate ? opinion.rate : 0}</div>
          
                          <button class="js-vote-down-btn grid--cell s-btn s-btn__unset c-pointer" title="This answer is not useful" aria-pressed="false" aria-label="down vote" data-selected-classes="fc-theme-primary"><svg aria-hidden="true" class="svg-icon m0 iconArrowDownLg" width="36" height="36" viewBox="0 0 36 36" onClick={this.voteDown.bind(this, opinion.id)}><path d="M2 10h32L18 26 2 10z"></path></svg></button>
                           
                          </span>
                          <div>
                            {this.state.editOpinionMode && this.state.selectedOpinionId === opinion.id
                            ?
                            <form onSubmit={this.handleEditedOpinionAdd.bind(this, opinion.title, opinion.content)}>
                              <input className="opinionTitleEditMode" defaultValue={opinion.title} onChange={this.handleEditedOpinionTitleSave.bind(this)}/><br/>
                              <textarea className="opinionContentEditMode" defaultValue={opinion.content} onChange={this.handleEditedOpinionContentSave.bind(this)}></textarea>
                              <input type="submit" className="opinionButton" value="Save"/>
                            </form>
                            : 
                            <div>
                              <h4>{opinion.title}</h4>
                              <p className="opinionContent" key={index}>{opinion.content}</p>
                            </div>
                            }
                          </div>
                          
                        </div>
                          <Comments opinionId={opinion.id}  addCommentField={this.addCommentField.bind(this)} isCommentClicked={this.state.isCommentClicked} selectedOpinionId={this.state.selectedOpinionId}/>
                          <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} styles={modalStyles} little>
                            <div className="notLoggedIn">
                              <p>You should be logged in to add a new comment!</p>
                              <div className="loginRegisterButtons">
                              <input type="button" className="loginRegisterButton" onClick={this.openLoginModal.bind(this)} value="Log in"/>
                              <p>Don't have an account? Register right now!</p>
                              <input type="button" className="loginRegisterButton" onClick={this.openRegisterModal.bind(this)} value="Register"/>
                              </div>
                            </div>
                          </Modal>
                          {this.state.openLoginModal ? <Login closeLoginModal={this.closeLoginModal.bind(this)} /> : <span></span>}
                          {this.state.openRegisterModal ? <Register closeRegisterModal={this.closeRegisterModal.bind(this)}/> : <span></span>}
                          
                        </div>
                        
                }) :
                  <p>This domain has no opinion so far</p>
                }
              </div>
            </React.Fragment>
      )
    }
  }

  export default Opinions;