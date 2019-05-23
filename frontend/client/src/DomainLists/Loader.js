import React from 'react';
import './Loader.scss';

class Loader extends React.Component {
    render() {
        return (
              <div class="spinner">
                <div class="bounce1"></div>
                <div class="bounce2"></div>
                <div class="bounce3"></div>
              </div>
        )
    }
}

export default Loader;