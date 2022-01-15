import { useEffect, useState } from 'react';
import Actions from '../redux/actions';
import { VipUser } from '../redux/state';
import store from '../redux/store';

const changeState = (user: Partial<VipUser>) => {
  Actions.updateUser(user);
};

export default function useUserState(): [VipUser | undefined, typeof changeState] {
  const [state, setState] = useState(store.getState().user);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(store.getState().user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return [state, changeState];
}
