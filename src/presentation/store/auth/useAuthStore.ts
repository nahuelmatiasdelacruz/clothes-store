import { create } from "zustand";
import { User } from "../../../domain/entities/user.entity";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authLogin } from "../../../actions/auth/auth";

export interface AuthState {
  token?: string;
  user?: User;
  status: AuthStatus;
  login: (email: string, password: string) => Promise<boolean>;
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

    // TODO: Guardar token en storage
    console.log({response});
    set({
      status: 'authenticated',
      token: response.token,
      user: response.user,
    });
    return true;
  }
}));