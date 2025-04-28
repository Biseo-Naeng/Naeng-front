import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import TermsScreen from './src/screens/TermsScreen';
import IdentityVerificationScreen from './src/screens/IdentityVerificationScreen';
import FillInfoScreen from './src/screens/FillInfoScreen';
import SignUpScreen from './src/screens/SignUpScreen';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Terms: undefined;
  IdentityVerification: undefined;
  FillInfo: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="IdentityVerification" component={IdentityVerificationScreen} />
        <Stack.Screen name="FillInfo" component={FillInfoScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
