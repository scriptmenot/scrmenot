import React from 'react';
import './NavBar.scss';
import { Redirect } from 'react-router-dom'

class NavBar extends React.Component {

    moveToCatalogue() {
        this.props.history.push('/browse');
        return <Redirect to="/browse"/>;
    }

    render() {
        return (
            <div className="NavBar">
                <ul>
                    <li className="btn-border-drawing">Home</li>
                    <li className="btn-border-drawing">Domains</li>
                    <li className="btn-border-drawing">Sign in</li>
                    <li className="btn-border-drawing">Sign up</li>
                </ul>
            </div>
        )
    }
}

export default NavBar;