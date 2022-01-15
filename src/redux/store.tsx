import { applyMiddleware, createStore, Reducer } from 'redux';
import { AppActions, AppActionType } from './actions';
import { AppState, AppStateKey, DEFAULT_STATE } from './state';
import getMiddleWares from './middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * reducer
 * 1. 重置状态
 * 2. 修改一个属性，类似localstorage.setItem
 * @returns {AppState}
 */
export const rootReducer: Reducer<AppState, AppActions> = (state, action): AppState => {
  if (!state) {
    return DEFAULT_STATE;
  }
  const { type, payload } = action;

  function changeStateByPayload(state: AppState, payload: Record<string, any>): AppState {
    if (payload) {
      const entries = Object.entries(payload);
      if (entries.length) {
        const [key, value] = entries[0] as [AppStateKey, any];
        if (key && state[key] === value) {
          return state;
        }
        return {
          ...state,
          ...payload,
        };
      }
    }
    return state;
  }

  switch (type) {
    case AppActionType.RESET:
      return DEFAULT_STATE;
    case AppActionType.SET:
      return changeStateByPayload(state, payload);
    default:
      return state;
  }
};

const store = createStore(rootReducer, DEFAULT_STATE, composeWithDevTools(applyMiddleware(...getMiddleWares())));

export default store;
