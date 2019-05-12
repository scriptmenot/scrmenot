import React from 'react';
import './DomainDetails.scss';

class AddOpinion extends React.Component{
    constructor(props) {
      super(props);
      this.state = {  
        domainId: this.props.location.state.dom.id,
        opinionTitle: "",
        opinionContent: "",
        isSafe: false
      };
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
  
  
      render() {
          return (
            <div className="AddOpinion">
              <p>Would you like to share Your opinion?</p>
              <input type="text" placeholder="Type a title of Your opinion" id="opinionTitle" value={this.state.opinionTitle} onChange={this.handleOpinionTitleChange.bind(this)} />
              <textarea id="opinionTextArea" value={this.state.opinionContent} onChange={this.handleOpinionContentChange.bind(this)}>Type something</textarea>
              <div className="safeOrDangerous" >
                <label><input type="radio" name="isSafe" value={true} onChange={this.handleSecurityLevel.bind(this)} required="required"/> Safe</label>
                <label><input type="radio" name="isSafe" value={false} onChange={this.handleSecurityLevel.bind(this)} checked={true}/> Dangerous</label>
                <button id="addOpinionButton" onClick={this.handleAdding.bind(this)}>Add </button>
              </div> 
            </div>
          )
      }
  }

  export default AddOpinion;