import React from 'react';
import './NavBar.scss';
import { Redirect } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Login from '../../LoginRegister/Login.js';
import Register from '../../LoginRegister/Register.js';

class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.state = {  
            openLoginModal: false,
            openRegisterModal: false
        }
    }

    moveToLandingPage(){
        this.props.history.push('/');
        return <Redirect to='/' />
    }

    moveToDomainsList(){
        this.props.history.push('/browse');
        return <Redirect to='/browse' />
      }

    openLoginModal(){
        this.setState({openLoginModal: true})
    }
    closeLoginModal(){
        this.setState({openLoginModal: false})
    }

    openRegisterModal(){
        this.setState({openRegisterModal: true})
    }
    closeRegisterModal(){
        this.setState({openRegisterModal: false})
    }

    render() {
        
        return (
            <div>
            <div className="NavBar">
                <ul className="menu">
                    <li onClick={this.moveToLandingPage.bind(this)}><p>Home</p></li>
                    <li onClick={this.moveToDomainsList.bind(this)}><p>Domains</p></li>
                    <li onClick={this.openLoginModal.bind(this)}><p>Sign in</p></li>
                    <li onClick={this.openRegisterModal.bind(this)}><p>Register</p></li>
                </ul>
                {this.state.openLoginModal ? <Login closeLoginModal={this.closeLoginModal.bind(this)}/> : <span></span>}
                {this.state.openRegisterModal ? <Register closeRegisterModal={this.closeRegisterModal.bind(this)}/> : <span></span>}
            </div>
            </div>
        )
    }
}

export default NavBar;