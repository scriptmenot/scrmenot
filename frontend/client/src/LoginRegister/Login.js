import React, { Component } from 'react';
import './Login.scss';
import Modal from 'react-responsive-modal';
import AuthService from '../AuthService/AuthService.js';

class Login extends Component {
    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.state = {  
            open: true,
            validCredentials: true
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
            localStorage.setItem('date', res.user.createdAt);
            localStorage.setItem('dateActive', res.user.updatedAt);
            localStorage.setItem('id', res.user.id);
           
            this.props.closeLoginModal();
        })
        .catch(err =>{
            this.setState({ validCredentials: false });
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
                        <input className={this.state.validCredentials ? "validLabelInput" : "invalidLabelInput"} type="text" name="email" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText"> {this.state.validCredentials ? "E-mail" : <font color="red">Invalid</font>}</div>
                    </label>
                    <label className="loginLabel">
                        <input className={this.state.validCredentials ? "validLabelInput" : "invalidLabelInput"} type="password" name="password" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">{this.state.validCredentials ? "Password" : <font color="red">Credentials</font>}</div>
                    </label>
                    <input type="submit" className="loginButton" value="Submit"/>
                </form>
            </Modal>
        </div>
        );
    }


}

export default Login;