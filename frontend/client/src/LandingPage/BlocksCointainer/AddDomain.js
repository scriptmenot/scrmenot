import React from 'react';
import './BlocksContainer.scss';
import Modal from 'react-responsive-modal';

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
                <img src={require('./images/plus.png')} alt="plus"/>
          </li>

          <Modal open={open} onClose={this.onCloseModal.bind(this)}  styles={modalStyles} little>

            <form id="addDomainForm" style={formStyles}  onSubmit={this.handleAdding.bind(this)}>

              <h4 style={firstHeaderStyles}>Type domain address</h4>
              <input style={domainNameStyles} type="text" id="newDomainURL" value={this.state.name} onChange={this.handleNameChange.bind(this)} required/>
              <h4 style={secondHeaderStyles}>What do you find about it?</h4>
              <textarea  id="newDomainComment"  style={commentStyles} placeholder='Type some comment' value={this.state.comment} onChange={this.handleCommentChange.bind(this)} required></textarea>
              <input type="submit" style={submitStyles} value="Add"/>

            </form>

          </Modal>
          
        </React.Fragment>
      )
  }
}

export default AddDomain;