import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import pkg from '../package.json';
import App from './App';
import store from './redux/store';

const root = document.getElementById('root') as HTMLDivElement;

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <App version={pkg.version} />
    </Provider>
  </React.Fragment>,
  root,
);
