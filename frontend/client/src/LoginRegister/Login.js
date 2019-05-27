import React, { Component } from 'react';
import './Login.scss';
import Modal from 'react-responsive-modal';
import AuthService from '../AuthService/AuthService.js';

class Login extends Component {
    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.state = {  
            open: true
        }
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.onCloseModal();
            alert("You are already logged in :)");
        }
    }

    handleLogin(e){
        e.preventDefault();
        this.Auth.login(this.state.email,this.state.password)
        .then(res =>{
            localStorage.setItem('username', res.user.username);
            this.props.closeLoginModal();
        })
        .catch(err =>{
            alert(err);
        })
    }

    onCloseModal () {
    this.setState({ open: false });
    this.props.closeLoginModal();
    };

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    render() {

        const { open } = this.state;

        const modalStyles2 = {
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          modal: {
            border: 'none',
            background: '#333333',
            width: '40vw',
            height: '45vh',
            textAlign: 'center',
            fontSize: '1.5vw',
            position: 'relative',
          },
          closeIcon: {
              cursor:'pointer',
              outline: 'none'
            }
        }
        return (
            <div><Modal open={open} onClose={this.onCloseModal.bind(this)}  styles={modalStyles2}>
                <form className="loginForm" onSubmit={this.handleLogin.bind(this)} >
                    <label className="loginLabel">
                        <input className="validLabelInput" type="text" name="email" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">E-mail</div>
                    </label>
                    <label className="loginLabel">
                        <input className="validLabelInput" type="password" name="password" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">Password</div>
                    </label>
                    <input type="submit" className="loginButton" value="Submit"/>
                </form>
            </Modal>
        </div>
        );
    }


}

export default Login;