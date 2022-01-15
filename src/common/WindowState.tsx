import { AppProps } from '../App';
import { AppState } from '../redux/state';

export const IS_BROWSER = typeof window !== 'undefined';

const DATA_KEY = Symbol('DATA_KEY');

export type GlobalWindow = Window & typeof globalThis;

function getWindow<T extends GlobalWindow>(): T {
  if (IS_BROWSER) {
    return window as T;
  }
  return global as T;
}

function getGlobalData(): GlobalData {
  if (!getWindow<any>()[DATA_KEY]) {
    getWindow<any>()[DATA_KEY] = {};
  }
  return getWindow<any>()[DATA_KEY];
}

function setGlobalData(data: GlobalData) {
  getWindow<any>()[DATA_KEY] = data;
}

/**
 * 全局数据
 */
export type GlobalData = Partial<{
  AppProps: AppProps;
  AppState: AppState;
}>;

export type GlobalKey = keyof GlobalData;

/**
 * 定义全局变量
 */
export default class WindowState {
  static set<K extends GlobalKey>(key: K, value: GlobalData[K]) {
    const data = getGlobalData();
    data[key] = value;
    setGlobalData(data);
  }

  static get<K extends GlobalKey>(key: K): GlobalData[K] {
    return getGlobalData()[key];
  }

  static getState(): GlobalData {
    return getGlobalData();
  }
}
