import { useCallback, useEffect, useState } from 'react';

export function useCount(): [number, () => void, () => void] {
  const [count, setCount] = useState(0);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const sub = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  useEffect(() => {}, []);

  return [count, add, sub];
}
