import { useEffect, useState } from 'react';
import store from '../redux/store';

export default function useStore() {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
