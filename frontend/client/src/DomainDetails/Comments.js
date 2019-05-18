import React from 'react';
import './DomainDetails.scss';

class Comments extends React.Component{

    constructor(props) {
        super(props);
        this.state = {  
          commentsMap: new Map(),
          commentContent: "",
          isCommentClicked: this.props.isCommentClicked,
          selectedOpinionId: this.props.selectedOpinionId
        };
    }

    loadComments(){
  
        let commentsArray = [];

        fetch(`https://fathomless-brushlands-42192.herokuapp.com/api/comment/opinion/${this.props.opinionId}`)
        .then(resp => resp.json())
            .then(resp => {
            [...resp].forEach(el => {
                commentsArray.push({"content": el.content, "updatedAt": el.updatedAt});
            })

            if(commentsArray.length !== 0)
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
        
        const data = {
          "content": this.state.commentContent,
          "opinionId": opinionId,
        };
        
        fetch("https://fathomless-brushlands-42192.herokuapp.com/api/comment", {
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
              isCommentClicked: false,
              commentContent: ""
            })
          })
          .catch(error => console.log(error));
        
      }

    render() {
        return (
                <React.Fragment>
                    <div className="Comments">
                        {
                            Array.isArray(this.state.commentsMap.get(this.props.opinionId)) ? 
                            
                            this.state.commentsMap.get(this.props.opinionId).map(comment => 
                            <div className="oneComment">
                            <h5>{comment.updatedAt.slice(0,10)}</h5>
                            <span className="commentContent"> {comment.content} </span>
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
                        <input type="submit" value="Add" id="addCommentButton"/>

                        </form>
                        :
                        <div></div>
                    }
              </React.Fragment>
        )
      }
}

export default Comments;