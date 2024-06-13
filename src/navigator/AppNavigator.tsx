import React, {createContext, useState, useEffect, useRef} from 'react';
import SigninScreen from '../screens/Signin/SigninScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyOtpScreen from '../screens/VerifyOtp/VerifyOtpScreen';
import PassCodeScreen from '../screens/Passcode/PassCodeScreen';
import Bottomtab from './BottomTabNavigator';
import {signin} from '../services/signin';
import {asyncStorage, common} from '../utils';
import {useDispatch} from 'react-redux';
import {setToken} from '../slices/authSlice';
import PassCodeSetUpScreen from '../screens/Passcode/PassCodeSetUpScreen';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext<any>({});

export default function AppNavigator() {
  const dispatch = useDispatch();
  const navigationRef = useRef(null);
  const [state, setState] = useState({
    user: null,
    isAuth: false,
    isLoading: false,
  });

  const checkAuth = async () => {
    const token = await asyncStorage.getDataFromAsyncStorage({
      key: 'idToken',
    });

    dispatch(setToken(token));

    setState({
      ...state,
      isAuth: !common.isExpireToken(token ?? ''),
    });
  };

  const login = async (phoneNumber: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    const response = await signin(phoneNumber);

    setState({
      ...state,
      isLoading: false,
      ...response,
    });

    return response;
  };

  const logout = () => {
    setState({
      ...state,
      isAuth: false,
    });
  };

  const updateAuth = () => {
    setState({
      ...state,
      isAuth: true,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        updateAuth,
      }}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {state.isAuth ? (
            <>
              <Stack.Screen name="PassCode" component={PassCodeScreen} />
              <Stack.Screen name="Bottomtab" component={Bottomtab} />
            </>
          ) : (
            <>
              <Stack.Screen name="SignIn" component={SigninScreen} />
              <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
              <Stack.Screen
                name="PassCodeSetUp"
                component={PassCodeSetUpScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
