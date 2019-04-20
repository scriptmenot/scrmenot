import React from 'react';
import './BlocksContainer.scss';
import Modal from 'react-responsive-modal';


class BlocksContainer extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };
    render() {
      const { open } = this.state;
      const modalStyles = {
        overlay: {
          backgroundColor: 'rgba(255, 255, 255, 0.75)'
        },
        modal: {
          border: '1px solid #ccc',
          background: '#fff',
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
        marginRight:'auto'
      }

      const submitStyles = {
        gridArea: '6/3/7/4', 
        marginLeft:'-10vw', 
        width: '6vw'
      }

      return (
          <ul className="BlocksContainer">
            <li className="AddDomainBlock" onClick={this.onOpenModal}>
              <img src={require('./plus.png')} alt="plus"/>
            </li>
            <Modal open={open} onClose={this.onCloseModal}  styles={modalStyles} little>
              <form id="addDomainForm" style={formStyles}>
                <h4 style={firstHeaderStyles}>Type a name of potentially dangerous domain</h4>
                <input style={domainNameStyles} type="text" id="newDomainURL"/>
                <h4 style={secondHeaderStyles}>Why do you find it dangerous?</h4>
                <textarea  id="newDomainComment"  style={commentStyles} placeholder='Type some comment'></textarea>
                <input type="submit" style={submitStyles}/>
              </form>
            </Modal>
            <li className="SearchDomainBlock"></li>
            <li className="BrowseCatalogueBlock"></li>
            <li className="TopDomains"></li>
          </ul>
      )

    }
}



export default BlocksContainer;