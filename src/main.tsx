import React from 'react';
import ReactDOM from 'react-dom';
import pkg from '../package.json';
import App from './App';

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.render(
  <React.Fragment>
    <App version={pkg.version}/>
  </React.Fragment>,
  root
);
