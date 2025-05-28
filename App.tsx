import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
import MypageScreen from './src/screens/MypageScreen';
import MyInfoScreen from './src/screens/MyInfoScreen';
import SettingScreen from './src/screens/SettingScreen';
import MypagePasswordChangeScreen from './src/screens/MypagePasswordChangeScreen';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import FriendScreen from './src/screens/FriendScreen';

import { Feather, MaterialCommunityIcons, FontAwesome6 } from '@expo/vector-icons';
import MyTabBar from './src/components/MyTabBar'

export type RootStackParamList = {
  Splash: undefined;
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
  MainTabs: undefined;
  MyInfo: undefined;
  Setting: undefined;
  MypagePasswordConfirm: undefined;
  MypageChangePassword: undefined;
};

export type MainTabParamList = {
  Mypage: undefined;
  Home: undefined;
  Recipe: undefined;
  Friend: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <MaterialCommunityIcons name="fridge-outline" size={size} color={color} />;
          } else if (route.name === 'Recipe') {
            return <FontAwesome6 name="utensils" size={size} color={color} />;
          } else if (route.name === 'Friend') {
            return <Feather name="users" size={size} color={color} />;
          } else if (route.name === 'Mypage') {
            return <Feather name="user" size={size} color={color} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#455BE2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Mypage" component={MypageScreen} />
    </Tab.Navigator>
  );
}

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
        <Stack.Screen name="FindId" component={FindIdScreen} />
        <Stack.Screen name="IdConfirm" component={IdConfirmScreen} />
        <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
        <Stack.Screen name="PasswordConfirm" component={PasswordConfirmScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="MypageChangePassword" component={MypagePasswordChangeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
