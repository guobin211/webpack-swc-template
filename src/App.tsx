import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import './App.scss';
import GlobalDefinition from './common/GlobalDefinition';
import store from './redux/store';
import AppRouter from './router';

export interface AppProps {
  version: string;
}

function App(props: AppProps) {
  useEffect(() => {
    GlobalDefinition.set('AppProps', props);
    const value = GlobalDefinition.get<AppProps>('AppProps');
    console.assert(value === props, 'AppProps is not equal');
  }, []);
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>
  );
}

export default App;
