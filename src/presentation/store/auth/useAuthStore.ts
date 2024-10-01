import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authLogin, checkAuthStatus } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
  token?: string;
  user?: User;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()((set,get)=>({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {

    const response = await authLogin(email,password);
    if(!response) {
      set({status: 'authenticated', token: undefined, user: undefined})
      return false;
    }
    await StorageAdapter.setItem('token',response.token);
    set({
      status: 'authenticated',
      token: response.token,
      user: response.user,
    });
    return true;
  },
  checkStatus: async () => {
    const response = await checkAuthStatus();
    if(!response){
      set({status: 'unauthenticated', token: undefined, user: undefined});
      return;
    }
    await StorageAdapter.setItem('token',response.token);
    set({
      status: 'authenticated',
      token: response.token,
      user: response.user,
    });
  },
  logout: async () => {
    await StorageAdapter.removeItem('token');
    set({status: 'authenticated', token: undefined, user: undefined});
  } 
}));