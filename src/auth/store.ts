import type LoginData from '@/models/LoginData';
import type LoginResponseData from '@/models/LoginResponseData';
import type User from '@/models/User';
import { loginUser, logoutUser } from '@/services/AuthService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
//local key for storing user data
const LOCAL_KEY = 'app_state';

type AuthState = {
  accessToken: string | null;
  user: User | null;
  authStatus: boolean;
  authLoading: boolean;
  login: (loginData: LoginData) => Promise<LoginResponseData>;
  logout: () => Promise<void>;
  checkLogin: () => boolean;
  changeLocalLoginData: (
    accessToken: string,
    user: User,
    authStatus: boolean
  ) => void;
};

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      authStatus: false,
      authLoading: false,

      login: async (loginData) => {
        try {
          set({ authLoading: true });

          const res = await loginUser(loginData);
          console.log(res);

          set({
            accessToken: res.accessToken,
            user: res.user,
            authStatus: true,
            authLoading: false,
          });

          return res;
        } catch (error) {
          set({
            accessToken: null,
            user: null,
            authStatus: false,
            authLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        // Clear client state first
        set({
          accessToken: null,
          user: null,
          authStatus: false,
          authLoading: false,
        });

        localStorage.removeItem(LOCAL_KEY);
        console.log('Cleared local storage for key:', LOCAL_KEY);

        // Best-effort backend logout
        try {
          await logoutUser();
        } catch (error) {
          console.warn('Backend logout failed (ignored):', error);
        }
      },

      // ✅ CORRECT checkLogin
      checkLogin: () => {
        return get().authStatus;
      },

      changeLocalLoginData: (accessToken, user, authStatus) => {
        set({
          accessToken,
          user,
          authStatus
        });
      }
    }),
    {
      name: LOCAL_KEY,
    }
  )
);

export default useAuth;
