import React, { Component } from 'react';
import './Login.scss';
import Modal from 'react-responsive-modal';
import AuthService from '../AuthService/AuthService.js';

class Register extends Component {
    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.state = {  
            open: true
        }
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.closeRegisterModal();
            alert("You are already logged in :)");
        }
    }

    handleRegistration(e){
        e.preventDefault();
        this.props.closeRegisterModal();
    }

    onCloseModal () {
    this.setState({ open: false });
    this.props.closeRegisterModal();
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
            height: '70vh',
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
            <React.Fragment>
                <Modal open={open} onClose={this.onCloseModal.bind(this)}  styles={modalStyles2}>
                <form className="loginForm">
                    <label className="loginLabel">
                        <input className="labelInput" type="text" name="email" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">E-mail</div>
                    </label>
                    <label className="loginLabel">
                        <input className="labelInput" type="text" name="Login" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">Login</div>
                    </label>
                    <label className="loginLabel">
                        <input className="labelInput" type="password" name="password" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">Password</div>
                    </label>
                    <label className="loginLabel">
                        <input className="labelInput" type="password" name="confirmPassword" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">Confirm password</div>
                    </label>
                    <button className="loginButton" onClick={this.handleRegistration.bind(this)}>Submit</button>
                </form>
            </Modal>
        </React.Fragment>
        );
    }


}

export default Register;