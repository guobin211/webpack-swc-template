import React, { useEffect } from 'react';
import './App.scss';
import WindowState from './common/WindowState';
import store from './redux/store';
import AppRouter from './router';

export interface AppProps {
  version: string;
}

function App(props: AppProps) {
  function initState() {
    WindowState.set('AppProps', props);
    WindowState.set('AppState', store.getState());
  }

  useEffect(() => {
    const subs = store.subscribe(() => {
      WindowState.set('AppState', store.getState());
    });
    return () => {
      subs();
    };
  }, [props]);

  useEffect(() => {
    initState();
    console.log('initState', WindowState.getState());
  }, []);
  return <AppRouter />;
}

export default App;
