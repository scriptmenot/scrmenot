import React from 'react';
import ReactDOM from 'react-dom';
import './landing_page/index.css';
import App from './landing_page/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
