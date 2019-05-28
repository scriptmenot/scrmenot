import React from 'react';
import './NavBar.scss';
import { Redirect } from 'react-router-dom';
import Login from '../../LoginRegister/Login.js';
import Register from '../../LoginRegister/Register.js';
import AuthService from '../../AuthService/AuthService.js';

class NavBar extends React.Component {

    constructor(props){
        super(props);
        this.Auth = new AuthService();
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

     moveToUserPanel(){
        this.props.history.push('/panel');
        return <Redirect to='/panel' />
      }
    openLoginModal(){
        this.setState({openLoginModal: true})
    }
    closeLoginModal(){
        this.setState({openLoginModal: false})
    }

    getUsername(username){
        this.setState({username: username})
    }

    openRegisterModal(){
        this.setState({openRegisterModal: true})
    }
    closeRegisterModal(){
        this.setState({openRegisterModal: false})
    }

    handleLogOut(){
        this.Auth.logout();
        this.props.history.replace('/');
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
                    <li onClick={this.handleLogOut.bind(this)}><p>Log out</p></li>
                    
                    
                    {this.Auth.loggedIn() ? <img id="userImage" src={require('../../DomainDetails/user.png')} alt="user" onClick={this.moveToUserPanel.bind(this)}/> : null }   
                    <div id="usernameLogin" onClick={this.moveToUserPanel.bind(this)}>{localStorage.getItem('username')}</div> 
      
                </ul>
                 
                {this.state.openLoginModal ? <Login closeLoginModal={this.closeLoginModal.bind(this)} /> : <span></span>}
                {this.state.openRegisterModal ? <Register closeRegisterModal={this.closeRegisterModal.bind(this)}/> : <span></span>}
            </div>
            </div>
        )
    }
}

export default NavBar;