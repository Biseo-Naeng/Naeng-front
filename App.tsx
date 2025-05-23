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
// 앞으로 추가할 다른 스크린 import
// import HomeScreen from './src/screens/HomeScreen';
// import SettingScreen from './src/screens/SettingScreen';
import Feather from '@expo/vector-icons/Feather';
import { View } from 'react-native';
import MyInfoScreen from './src/screens/MyInfoScreen';
import SettingScreen from './src/screens/SettingScreen';

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
  MainTabs: undefined; // Tab Navigator를 위한 route
  MyInfo: undefined;
  Setting: undefined;
};

export type MainTabParamList = {
  Mypage: undefined;  
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={props => (
        <View>
          {/* 하단 탭 아이콘 바로 위에 bar */}
          <View style={{ height: 4, backgroundColor: '#455BE2', width: '100%' }} />
          <BottomTabBar {...props} />
        </View>
      )}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Feather>['name'] = 'user';
          if (route.name === 'Mypage') iconName = "user";
          // if (route.name === 'Home') iconName = 'home';
          // if (route.name === 'Setting') iconName = 'settings';
          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#455BE2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Mypage" component={MypageScreen} />
      {/* <Tab.Screen name="Home" component={HomeScreen} options={{ title: '홈' }} /> */}
      {/* <Tab.Screen name="Setting" component={SettingScreen} options={{ title: '설정' }} /> */}
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
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="PasswordConfirm" component={PasswordConfirmScreen} />
        {/* 하단탭이 필요한 부분은 MainTabs로 이동 */}
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="MyInfo" component={MyInfoScreen} />
        <Stack.Screen name="Setting" component={SettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}