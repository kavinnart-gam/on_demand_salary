import React, {useContext, useEffect} from 'react';
import {createContext, useState} from 'react';
import asyncStorage from '../utils/asyncStorage';
import {axios, common} from '../utils';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    isLoading?: boolean | null;
  };
  onSignin?: (phoneNumber: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  onUpdateAuth?: () => void;
}

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    isLoading?: boolean | null;
  }>({token: null, authenticated: null, isLoading: false});

  useEffect(() => {
    const loadToken = async () => {
      const token = await asyncStorage.getDataFromAsyncStorage({
        key: 'idToken',
      });

      if (token) {
        setAuthState({
          token: token,
          authenticated: !common.isExpireToken(token),
        });
      }
    };
    loadToken();
  }, []);

  const signin = async (phoneNumber: string) => {
    try {
      setAuthState({
        ...authState,
        isLoading: true,
      });

      const response = await axios.post('/api/v1/signin', {
        phone: phoneNumber,
      });

      setAuthState({
        ...authState,
        token: response?.data?.data?.token,
        isLoading: false,
      });

      // set token to local
      await asyncStorage.setDataToAsyncStorage({
        key: 'idToken',
        value: response?.data?.data?.token,
      });

      return response?.data;
    } catch (error) {
      return {error: true, msg: (error as any).response.data.msg};
    }
  };

  const logout = async () => {
    // Delete token from storage
    await asyncStorage.removeDataToAsyncStorage({key: 'idToken'});

    // Update header
    axios.defaults.headers.common['Authorization'] = '';

    // Reset auth state
    setAuthState({
      token: null,
      authenticated: null,
      isLoading: false,
    });
  };

  const updateAuth = () => {
    setAuthState({
      ...authState,
      authenticated: true,
    });
  };

  const value = {
    onLogout: logout,
    onSignin: signin,
    onUpdateAuth: updateAuth,
    authState: authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
