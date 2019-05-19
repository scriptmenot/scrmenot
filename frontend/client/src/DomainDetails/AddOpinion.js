import React from 'react';
import './DomainDetails.scss';
import Modal from 'react-responsive-modal';

class AddOpinion extends React.Component{
    constructor(props) {
      super(props);
      this.state = {  
        domainId: this.props.location.state.dom.id,
        opinionTitle: "",
        opinionContent: "",
        isSafe: false,
        open: false,
        disabled: false
      };
    }
    
    onOpenModal() {
      this.setState({ open: true });
    };
  
    onCloseModal () {
      this.setState({ open: false });
    };
  
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
      this.setState({disabled: true});
    
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
          opinionContent: "",
          disabled: false
          });
          
          this.onCloseModal();
        })
        .catch(error => console.log(error));

        return false;
    }


    handleNameChange(e){
      this.setState({name: e.target.value});
   };
  
   handleCommentChange(e){
    this.setState({comment: e.target.value});
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
            width: '700vw',
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

        const safeOrDangerousStyles = {
          gridArea: '2/2/5/3',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          transform: 'translate(75%, 29%)',
          fontSize: '70%'
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
            <div className="AddOpinion">
              <button onClick={this.onOpenModal.bind(this)}>Add your opinion</button>
              <Modal open={open} onClose={this.onCloseModal.bind(this)}  styles={modalStyles} little>

                <form id="addDomainForm" style={formStyles}  onSubmit={this.handleAdding.bind(this)}>

                  <h4 style={firstHeaderStyles}>Type a title of Your opinion</h4>
                  <input style={domainNameStyles} type="text" id="opinionTitle" value={this.state.opinionTitle} onChange={this.handleOpinionTitleChange.bind(this)} placeholder='Title' required/>
                  <h4 style={secondHeaderStyles}>Share your opinion about this domain</h4>
                  <textarea  id="newDomainComment"  style={commentStyles} placeholder='Content' value={this.state.opinionContent} onChange={this.handleOpinionContentChange.bind(this)} required></textarea>
                  <div style={safeOrDangerousStyles}>

                    <label><input type="radio" name="isSafe" value={true} onChange={this.handleSecurityLevel.bind(this)} required="required"/> Safe</label>
                    <label><input type="radio" name="isSafe" value={false} onChange={this.handleSecurityLevel.bind(this)} checked={true}/> Dangerous</label>
                  
                  </div>
                  <input type="submit" style={submitStyles} value="Add" disabled={this.state.disabled}/>

                </form>

              </Modal>
            </div>
          )
      }
  }

  export default AddOpinion;