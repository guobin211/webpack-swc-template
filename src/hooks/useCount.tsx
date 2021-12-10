import { useEffect, useState } from 'react';
import store from '../redux/store';

export function useCount(): [number, () => void, () => void,] {
  const [count, setCount] = useState(store.getState().count);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setCount(store.getState().count);
    });
    return () => {
      unsub();
    };
  }, []);

  return [
    count,
    () => store.dispatch({ type: 'INCREMENT' }),
    () => store.dispatch({ type: 'DECREMENT' })
  ];
}
