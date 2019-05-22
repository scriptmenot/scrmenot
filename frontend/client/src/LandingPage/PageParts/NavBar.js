import React from 'react';
import './NavBar.scss';
import { Redirect } from 'react-router-dom'

class NavBar extends React.Component {

    moveToLandingPage(){
        this.props.history.push('/');
        return <Redirect to='/' />
    }

    moveToDomainsList(){
        this.props.history.push('/browse');
        return <Redirect to='/browse' />
      }

    render() {
        return (
            <div className="NavBar">
                <ul className="menu">
                    <li onClick={this.moveToLandingPage.bind(this)}><p>Home</p></li>
                    <li onClick={this.moveToDomainsList.bind(this)}><p>Domains</p></li>
                    <li ><p>Sign in</p></li>
                    <li ><p>Register</p></li>
                </ul>
            </div>
        )
    }
}

export default NavBar;