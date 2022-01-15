export type AppStateKey = keyof AppState;

export interface AppState {
  env: string;
  user?: VipUser;
}

export type UserInfo = Partial<{
  username: string;
  user_id: string;
  nickname: string;
  age: number;
}>;

export interface VipUser extends UserInfo {
  is_login: boolean;
  is_vip: boolean;
  vip_level: number;
}

export const DEFAULT_STATE: AppState = {
  env: 'dev',
  user: {
    is_login: false,
    is_vip: false,
    vip_level: 0,
  },
};
