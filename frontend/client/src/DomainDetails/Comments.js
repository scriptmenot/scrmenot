import React from 'react';
import './DomainDetails.scss';
import AuthService from '../AuthService/AuthService.js';

class Comments extends React.Component{

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.isCommentAuthor = this.isCommentAuthor.bind(this);
        this.state = {  
          commentsMap: new Map(),
          commentContent: "",
          isCommentClicked: this.props.isCommentClicked,
          selectedOpinionId: this.props.selectedOpinionId,
          disabled: false,
          editCommentMode: false,
          selectedCommentId: ""

        };
    }

    loadComments(){
        
        let commentsArray = [];

        fetch(`https://scrmenotlogin.herokuapp.com/api/comment/opinion/${this.props.opinionId}`)
        .then(resp => resp.json())
            .then(resp => {
                
            [...resp].forEach(el => {
                commentsArray.push({"id": el.id, "content": el.content, "updatedAt": el.updatedAt, "userId": el.userId});
            })

            if(commentsArray.length === 0)
              commentsArray = [];

            this.state.commentsMap.set(this.props.opinionId, commentsArray);
            commentsArray = [];
        });

    }

    componentDidMount() {
  
        this._isMounted = true;
        this.loadComments();
  
      }

      componentDidUpdate() {
  
        this._isMounted = true;
        this.loadComments();
  
      }
      
      componentWillReceiveProps(nextProps){
        if(nextProps.isCommentClicked!==this.props.isCommentClicked){
          this.setState({
                isCommentClicked: nextProps.isCommentClicked, 
                selectedOpinionId: nextProps.selectedOpinionId 
            });
          
        }
      }
  
      handleCommentContentChange(e) {
  
        this.setState({commentContent: e.target.value});
      }
  
      handleCommentAdding(opinionId, e){
        e.preventDefault();
        this.setState({disabled: true});
        
        const data = {
          "content": this.state.commentContent,
          "opinionId": opinionId,
        };
        
        fetch("https://scrmenotlogin.herokuapp.com/api/comment", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.Auth.getToken()
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            this.setState({
              isCommentClicked: false,
              commentContent: "",
              disabled: false
            })
          })
          .catch(error => console.log(error));
        
      }

      deleteComment(commentId){
        return fetch(`https://scrmenotlogin.herokuapp.com/api/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.Auth.getToken()
            },
        })
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {}).then(t => console.log(t))
        .catch((error) => {
            throw error;
        });
      }

      editComment(commentIndex){

        if(this.state.editCommentMode && this.state.selectedCommentId === commentIndex)
        {
          this.setState({editCommentMode: false});
        }
        else 
          this.setState({
            editCommentMode: true, 
            selectedCommentId: commentIndex
          });
      }

  
      handleEditedCommentContentSave(e){
       
        this.setState({
          editedCommentContent: e.target.value
        })
      }
  
      handleEditedCommentAdd(oldCommentContent, e){
        e.preventDefault();
        
        const data = {
          "content": this.state.editedCommentContent !== oldCommentContent && this.state.editedCommentContent !== "" && typeof this.state.editedCommentContent !== "undefined" ? this.state.editedCommentContent : oldCommentContent
        };
        if(data.content !== oldCommentContent){
          fetch(`https://scrmenotlogin.herokuapp.com/api/comment/${this.state.selectedCommentId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + this.Auth.getToken()
            },
            body: JSON.stringify(data)
          })
          .then((res) =>{
            res.text();
          })
          .catch((error) => {
            throw error;
          });
        }
        this.setState({ editCommentMode: false});
        
      }

      isCommentAuthor(commentAuthorId){
        return commentAuthorId == localStorage.getItem('userId');
      }

    render() {
        return (
                <React.Fragment>
                    <div className="Comments">
                        {
                            Array.isArray(this.state.commentsMap.get(this.props.opinionId)) 
                            ? 
                            this.state.commentsMap.get(this.props.opinionId).slice(0).reverse().map((comment, index) => 
                            <div className="oneComment" key={index}>
                            {this.Auth.loggedIn() && this.isCommentAuthor(comment.userId)
                                ?
                                <div className="editingOperationsComments">
                                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMDAgMzAwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMDAgMzAwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTQ5Ljk5NiwwQzY3LjE1NywwLDAuMDAxLDY3LjE2MSwwLjAwMSwxNDkuOTk3UzY3LjE1NywzMDAsMTQ5Ljk5NiwzMDBzMTUwLjAwMy02Ny4xNjMsMTUwLjAwMy0xNTAuMDAzICAgIFMyMzIuODM1LDAsMTQ5Ljk5NiwweiBNMjIxLjMwMiwxMDcuOTQ1bC0xNC4yNDcsMTQuMjQ3bC0yOS4wMDEtMjguOTk5bC0xMS4wMDIsMTEuMDAybDI5LjAwMSwyOS4wMDFsLTcxLjEzMiw3MS4xMjYgICAgbC0yOC45OTktMjguOTk2TDg0LjkyLDE4Ni4zMjhsMjguOTk5LDI4Ljk5OWwtNy4wODgsNy4wODhsLTAuMTM1LTAuMTM1Yy0wLjc4NiwxLjI5NC0yLjA2NCwyLjIzOC0zLjU4MiwyLjU3NWwtMjcuMDQzLDYuMDMgICAgYy0wLjQwNSwwLjA5MS0wLjgxNywwLjEzNS0xLjIyNCwwLjEzNWMtMS40NzYsMC0yLjkxLTAuNTgxLTMuOTczLTEuNjQ3Yy0xLjM2NC0xLjM1OS0xLjkzMi0zLjMyMi0xLjUxMi01LjIwM2w2LjAyNy0yNy4wMzUgICAgYzAuMzQtMS41MTcsMS4yODYtMi43OTgsMi41NzgtMy41ODJsLTAuMTM3LTAuMTM3TDE5Mi4zLDc4Ljk0MWMxLjY3OC0xLjY3NSw0LjQwNC0xLjY3NSw2LjA4MiwwLjAwNWwyMi45MjIsMjIuOTE3ICAgIEMyMjIuOTgyLDEwMy41NDEsMjIyLjk4MiwxMDYuMjY3LDIyMS4zMDIsMTA3Ljk0NXoiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="edit" id="edit" onClick={this.editComment.bind(this, comment.id)}/>
                                    <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSIwIDAgNDQ4IDQ0OCIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMTI4IDE2OGgxOTJ2LTE2aC0xOTJ6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0yMjQgMGMtMTIzLjcxMDkzOCAwLTIyNCAxMDAuMjg5MDYyLTIyNCAyMjRzMTAwLjI4OTA2MiAyMjQgMjI0IDIyNCAyMjQtMTAwLjI4OTA2MiAyMjQtMjI0Yy0uMTQwNjI1LTEyMy42NTIzNDQtMTAwLjM0NzY1Ni0yMjMuODU5Mzc1LTIyNC0yMjR6bTExMiAxNzZjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOGgtOC43NjE3MTlsLTE1LjIzODI4MSAxNTIuODAwNzgxYy0uNDE0MDYyIDQuMTAxNTYzLTMuODc1IDcuMjE4NzUtOCA3LjE5OTIxOWgtMTQ0Yy00LjEyNS4wMTk1MzEtNy41ODU5MzgtMy4wOTc2NTYtOC03LjE5OTIxOWwtMTUuMTk5MjE5LTE1Mi44MDA3ODFoLTguODAwNzgxYy00LjQxNzk2OSAwLTgtMy41ODIwMzEtOC04di0zMmMwLTQuNDE3OTY5IDMuNTgyMDMxLTggOC04aDgxLjQ3MjY1NmMtLjk0OTIxOC0yLjU2MjUtMS40NDUzMTItNS4yNjk1MzEtMS40NzI2NTYtOCAwLTEzLjI1MzkwNiAxMC43NDYwOTQtMjQgMjQtMjRzMjQgMTAuNzQ2MDk0IDI0IDI0Yy0uMDI3MzQ0IDIuNzMwNDY5LS41MjM0MzggNS40Mzc1LTEuNDcyNjU2IDhoODEuNDcyNjU2YzQuNDE3OTY5IDAgOCAzLjU4MjAzMSA4IDh6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjxwYXRoIGQ9Im0xNTkuMjM4MjgxIDMyOGgxMjkuNTYyNWwxNC4zOTg0MzgtMTQ0aC0xNTguMzU5Mzc1em05Ni44MDA3ODEtMTA0Ljk5MjE4OGMuMjkyOTY5LTIuODg2NzE4IDIuMTI1LTUuMzkwNjI0IDQuNzkyOTY5LTYuNTQyOTY4IDIuNjY0MDYzLTEuMTQ4NDM4IDUuNzQ2MDk0LS43NjE3MTkgOC4wNDY4NzUgMS4wMDc4MTIgMi4zMDA3ODIgMS43Njk1MzIgMy40NjA5MzggNC42NDg0MzggMy4wMzEyNSA3LjUxOTUzMmwtOCA2NGMtLjQ5NjA5NCAzLjk5MjE4Ny0zLjg4NjcxOCA2Ljk5NjA5My03LjkxMDE1NiA3LjAwNzgxMi0uMzM1OTM4IDAtLjY2Nzk2OS0uMDIzNDM4LTEtLjA2MjUtNC4zODI4MTItLjU1MDc4MS03LjQ5MjE4OC00LjU0Njg3NS02Ljk0NTMxMi04LjkyOTY4OHptLTQwLjAzOTA2Mi45OTIxODhjMC00LjQxNzk2OSAzLjU4MjAzMS04IDgtOHM4IDMuNTgyMDMxIDggOHY2NGMwIDQuNDE3OTY5LTMuNTgyMDMxIDgtOCA4cy04LTMuNTgyMDMxLTgtOHptLTMyLjk5MjE4OC03LjkzNzVjNC4zODI4MTMtLjU0Njg3NSA4LjM3ODkwNyAyLjU2MjUgOC45Mjk2ODggNi45NDUzMTJsOCA2NGMuNTQ2ODc1IDQuMzgyODEzLTIuNTYyNSA4LjM3ODkwNy02Ljk0NTMxMiA4LjkyOTY4OC0uMzI4MTI2LjAzOTA2Mi0uNjYwMTU3LjA1ODU5NC0uOTkyMTg4LjA2MjUtNC4wMzEyNS0uMDAzOTA2LTcuNDI5Njg4LTMuMDA3ODEyLTcuOTI5Njg4LTcuMDA3ODEybC04LTY0Yy0uNTQ2ODc0LTQuMzc4OTA3IDIuNTU4NTk0LTguMzc1IDYuOTM3NS04LjkyOTY4OHptMCAwIiBmaWxsPSIjMDAwMDAwIi8+PHBhdGggZD0ibTIzMiAxMjhjMCA0LjQxNzk2OS0zLjU4MjAzMSA4LTggOHMtOC0zLjU4MjAzMS04LTggMy41ODIwMzEtOCA4LTggOCAzLjU4MjAzMSA4IDh6bTAgMCIgZmlsbD0iIzAwMDAwMCIvPjwvc3ZnPgo=" alt="delete" id="delete" onClick={this.deleteComment.bind(this, comment.id)}/>
                                </div>
                                :
                                null
                            }
                                <div>
                                    {this.state.editCommentMode && this.state.selectedCommentId === comment.id
                                    ?
                                    <React.Fragment>
                                        <h5>{comment.updatedAt.slice(11,19)} <br/> {comment.updatedAt.slice(0,10)} </h5>
                                        <form onSubmit={this.handleEditedCommentAdd.bind(this, comment.content)}>
                                            <textarea className="commentContentEditMode" defaultValue={comment.content} onChange={this.handleEditedCommentContentSave.bind(this)}></textarea>
                                            <input type="submit" className="commentButton" value="Save"/>
                                        </form>
                                    </React.Fragment>
                                    : 
                                    <div>
                                        <h5>{comment.updatedAt.slice(11,19)} <br/> {comment.updatedAt.slice(0,10)} </h5>
                                        <span className="commentContent" > {comment.content} </span>
                                    </div>
                                    }
                                </div>
                          
                            </div>
                            )
                            : <span></span>
                        }
                    </div>
                    {
                        (this.state.isCommentClicked && this.state.selectedOpinionId === this.props.opinionId) 
                        ?
                        <form id="addCommentForm" onSubmit={this.handleCommentAdding.bind(this, this.props.opinionId)}  >

                        <h4>Type a comment</h4>
                        <textarea  id="opinionComment"  placeholder='Content' value={this.state.commentContent} onChange={this.handleCommentContentChange.bind(this)} required></textarea>
                        <input type="submit" value="Add" id="addCommentButton" disabled={this.state.disabled}/>

                        </form>
                        :
                        <div></div>
                    }
              </React.Fragment>
        )
      }
}

export default Comments;