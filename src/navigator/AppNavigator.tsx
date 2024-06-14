import React, {createContext} from 'react';
import SigninScreen from '../screens/Signin/SigninScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyOtpScreen from '../screens/VerifyOtp/VerifyOtpScreen';
import PassCodeScreen from '../screens/Passcode/PassCodeScreen';
import Bottomtab from './BottomTabNavigator';
import {useAuth} from '../context/AuthContext';

const Stack = createNativeStackNavigator();
export const AuthContext = createContext<any>({});

export default function AppNavigator() {
  const {authState} = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false, gestureEnabled: false}}>
        {authState?.authenticated ? (
          <>
            <Stack.Screen name="PassCode" component={PassCodeScreen} />
            <Stack.Screen name="Bottomtab" component={Bottomtab} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SigninScreen} />
            <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
