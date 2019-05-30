import React, { Component } from 'react';
import './Login.scss';
import Modal from 'react-responsive-modal';
import AuthService from '../AuthService/AuthService.js';

class Register extends Component {
    constructor(props){
        super(props);
        this.Auth = new AuthService();
        this.state = {  
            open: true,
            isEmailValid: true,
            isConfirmPasswordValid: true
        }
    }

    componentWillMount(){
        if(this.Auth.loggedIn()){
            this.props.closeRegisterModal();
            alert("You are already logged in :)");
        }
    }


    validateEmail() 
    {
        var mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(typeof this.state.email !== "undefined" && this.state.email !== ""){

            if (!mailFormat.test(this.state.email))
               this.setState({isEmailValid: false});
            else
                this.setState({isEmailValid: true});
        }
        else
        this.setState({isEmailValid: true});
    }

    validateInputData(){

        if(this.state.isEmailValid && this.state.isConfirmPasswordValid)
            return true;
        return false;
        
    }

    validateConfirmPassword(){
        if(this.state.password === this.state.confirmPassword)
            this.setState({isConfirmPasswordValid: true});
        else
            this.setState({isConfirmPasswordValid: false});
    }

    handleRegistration(e){
        e.preventDefault();
        const data = {
            "email": this.state.email,
            "password": this.state.password,
            "username": this.state.username
        }
        console.log(data);
        if(this.validateInputData()){

            fetch("https://scrmenotlogin.herokuapp.com/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                  body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.props.closeRegisterModal();  
                })
                .catch(error => console.log(error));
        }
  
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
                <form className="loginForm" onSubmit={this.handleRegistration.bind(this)} >
                    <label className="loginLabel">
                        <input className={this.state.isEmailValid ? "validLabelInput" : "invalidLabelInput"} type="text" name="email" onChange={this.handleChange.bind(this)} onBlur={this.validateEmail.bind(this)} required />
                        <div className="labelText">{this.state.isEmailValid ? "E-mail" : <font color="red">Invalid e-mail format!</font>}</div>
                    </label>
                    <label className="loginLabel">
                        <input className="validLabelInput" type="text" name="username" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">Login</div>
                    </label>
                    <label className="loginLabel">
                        <input className="validLabelInput" type="password" name="password" onChange={this.handleChange.bind(this)} required />
                        <div className="labelText">Password</div>
                    </label>
                    <label className="loginLabel">
                        <input className={this.state.isConfirmPasswordValid ? "validLabelInput" : "invalidLabelInput"} type="password" name="confirmPassword" onChange={this.handleChange.bind(this)} onBlur={this.validateConfirmPassword.bind(this)} required />
                        <div className="labelText">{this.state.isConfirmPasswordValid ? "Confirm password" : <font color="red">Passwords don't match!</font>}</div>
                    </label>
                    <input type="submit" value="Submit" className="loginButton" />
                </form>
            </Modal>
        </React.Fragment>
        );
    }


}

export default Register;