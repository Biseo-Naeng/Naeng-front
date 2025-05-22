import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import TermsScreen from './src/screens/TermsScreen';
import IdentityVerificationScreen from './src/screens/IdentityVerificationScreen';
import FillInfoScreen from './src/screens/FillInfoScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import FindIdScreen from './src/screens/FindIdScreen';
import IdConfirmScreen from './src/screens/IdConfirmScreen';
import FindPasswordScreen from './src/screens/FindPasswordScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import PasswordConfirmScreen from './src/screens/PasswordConfirmScreen';
import MypagePasswordConfirmScreen from './src/screens/MypagePasswordConfirmScreen';
import MypagePasswordChangeScreen from './src/screens/MypagePasswordChangeScreen';

export type RootStackParamList = { 
  Splash: undefined; //스크린으로 이동할 때 매개변수를 전달하지 않음
  Login: undefined;
  Terms: undefined;
  IdentityVerification: undefined;
  FillInfo: undefined;
  SignUp: undefined;
  FindId: undefined;
  IdConfirm: undefined;
  FindPassword: undefined;
  ChangePassword: undefined;
  PasswordConfirm: undefined;
  MypagePasswordConfirm: undefined;
  MypageChangePassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>(); //네비게이터 객체 생성하는거고 Stack으로 만듦
//Splash 앱 로그뜨고 그런거 만들어 놓은거임
export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="MypagePasswordConfirm" screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="IdentityVerification" component={IdentityVerificationScreen} />
        <Stack.Screen name="FillInfo" component={FillInfoScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="FindId" component={FindIdScreen} />
        <Stack.Screen name="IdConfirm" component={IdConfirmScreen} />
        <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
        <Stack.Screen name="PasswordConfirm" component={PasswordConfirmScreen} />
        <Stack.Screen name="MypagePasswordConfirm" component={MypagePasswordConfirmScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="MypageChangePassword" component={MypagePasswordChangeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
