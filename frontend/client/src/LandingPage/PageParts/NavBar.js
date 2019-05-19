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
                <ul>
                    <li className="btn-border-drawing" onClick={this.moveToLandingPage.bind(this)}>Home</li>
                    <li className="btn-border-drawing" onClick={this.moveToDomainsList.bind(this)}>Domains</li>
                    <li className="btn-border-drawing">Sign in</li>
                    <li className="btn-border-drawing">Sign up</li>
                </ul>
            </div>
        )
    }
}

export default NavBar;