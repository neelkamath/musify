import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { writeState } from './storage';

ReactDOM.render(<App />, document.querySelector('#root'));
setInterval(writeState, 3_000);
