import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import  Constants  from "expo-constants";

interface AuthState {
  token: string | null;
  authenticated: boolean;
}

interface AuthProps {
  authState: AuthState;
  onRegister: (email: string, password: string) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
}

const TOKEN_KEY = 'my-acc';
export const API_URL = Constants.extra?.API_URL; 

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: false },
  onRegister: async () => { throw new Error("onRegister not implemented"); },
  onLogin: async () => { throw new Error("onLogin not implemented"); },
  onLogout: async () => { throw new Error("onLogout not implemented"); },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => { 
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: false
  });

const [isInitializing, setIsInitializing] = useState(true);

useEffect(() => {
  const loadToken = async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuthState({ token, authenticated: true });
    } else {
      setAuthState({ token: null, authenticated: false });
    }
    setIsInitializing(false);
  };
  loadToken();
}, []);

  const register = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/users`, { email, password });
      return result;
    } catch (e: any) {
      return { error: true, msg: e.response?.data?.msg ?? 'Registration failed' };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, { email, password });

      setAuthState({
        token: result.data.token,
        authenticated: true
      });
      axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);

      return result;
    } catch (e: any) {
      return { error: true, msg: e.response?.data?.msg ?? 'Login failed' };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    delete axios.defaults.headers.common['Authorization'];
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
