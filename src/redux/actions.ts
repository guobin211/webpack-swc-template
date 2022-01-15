import { AnyAction } from 'redux';
import { AppState, VipUser } from './state';
import store from './store';

export enum AppActionType {
  RESET,
  SET,
}

export interface AppActions extends AnyAction {
  type: AppActionType;
  payload: Partial<AppState>;
}

/**
 * 修改state的属性
 * 此方法可以不对外暴露
 * @param {K: Key} key keyof AppState
 * @param {AppState[key]} value
 * @returns {{payload: {}, type: AppActionType}}
 */
function set<K extends keyof AppState>(key: K, value: AppState[K]) {
  return store.dispatch({
    type: AppActionType.SET,
    payload: { [key]: value },
  });
}

/**
 * 重置state
 * @returns {{payload: {}, type: AppActionType}}
 */
export function resetAppState() {
  return store.dispatch({
    type: AppActionType.RESET,
    payload: {},
  });
}

/**
 * 修改env属性
 * 修改单个属性的方法可以对外暴露，在这里做数据检查
 * @param {AppState["env"]} env
 * @returns {{payload: {env: string}, type: AppActionType}}
 */
export function setAppEnv(env: string) {
  if (!env) {
    throw new Error('env不能为空');
  }
  if (typeof (env as any) !== 'string') {
    throw new Error('env必须为字符串');
  }
  return set('env', env);
}

export default class Actions {
  static setAppEnv = setAppEnv;
  static resetAppState = resetAppState;

  static updateUser = (user: Partial<VipUser>) => {
    const old = store.getState().user;
    const update = Object.assign({}, old, user);
    set('user', update);
  };
}
