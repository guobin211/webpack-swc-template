import store from '../redux/store'
import { useEffect, useState } from 'react'

export function useCount() {
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
        () => store.dispatch({ type: 'DECREMENT' }),
    ]
}
