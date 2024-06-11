import React from 'react';
import SigninScreen from '../screens/Signin/SigninScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import VerifyOtpScreen from '../screens/VerifyOtp/VerifyOtpScreen';
import PassCodeScreen from '../screens/Passcode/PassCodeScreen';
import Bottomtab from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SignIn" component={SigninScreen} />
          <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
          <Stack.Screen name="PassCode" component={PassCodeScreen} />
          <Stack.Screen name="Bottomtab" component={Bottomtab} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
