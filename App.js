import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LoginScreen from "./src/screens/LoginScreen";
import SignUpEmail from "./src/screens/SignUpEmailScreen";
import SignUpBirth from "./src/screens/SignUpBirthScreen";
import SignUpName from "./src/screens/SignUpNameScreen";
import MainScreen from "./src/screens/MainScreen";
import SignUpGender from "./src/screens/SignUpGenderScreen";
import SignUpNickname from "./src/screens/SignUpNicknameScreen";
import SignUpNumber from "./src/screens/SignUpNumberScreen";
import SignUpPassword from "./src/screens/SignUpPasswordScreen";
import SignUpProfile from "./src/screens/SignUpProfileScreen";

import { fonts } from "./src/utils/fontStyles";
import RecipeScreen from "./src/screens/ResipeScreen";
import FriendScreen from "./src/screens/FriendScreen";
import MypageScreen from "./src/screens/MypageScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60, // 원하는 높이
          borderTopColor: "#ccc",
          borderTopWidth: 1,
        },
        // 탭 아이콘/라벨 스타일 등
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Recipe" component={RecipeScreen} />
      <Tab.Screen name="Friend" component={FriendScreen} />
      <Tab.Screen name="Mypage" component={MypageScreen} options={{ headerShown: false }} />      
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.nAcBold]: require("./src/assets/fonts/NanumSquare_acB.ttf"),
    [fonts.nAcExtraBold]: require("./src/assets/fonts/NanumSquare_acEB.ttf"),
    [fonts.nAcLight]: require("./src/assets/fonts/NanumSquare_acL.ttf"),
    [fonts.nAcRegular]: require("./src/assets/fonts/NanumSquare_acR.ttf"),
    [fonts.nBold]: require("./src/assets/fonts/NanumSquareB.ttf"),
    [fonts.nExtraBold]: require("./src/assets/fonts/NanumSquareEB.ttf"),
    [fonts.nLight]: require("./src/assets/fonts/NanumSquareL.ttf"),
    [fonts.nRegular]: require("./src/assets/fonts/NanumSquareR.ttf"),
    SCDream1: require("./src/assets/fonts/SCDream1.otf"),
    SCDream2: require("./src/assets/fonts/SCDream2.otf"),
    SCDream3: require("./src/assets/fonts/SCDream3.otf"),
    SCDream4: require("./src/assets/fonts/SCDream4.otf"),
    SCDream5: require("./src/assets/fonts/SCDream5.otf"),
    SCDream6: require("./src/assets/fonts/SCDream6.otf"),
    SCDream7: require("./src/assets/fonts/SCDream7.otf"),
    SCDream8: require("./src/assets/fonts/SCDream8.otf"),
    SCDream9: require("./src/assets/fonts/SCDream9.otf"),
  });

  // Prevent splash screen from auto-hiding
  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpNameScreen"
          component={SignUpName}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpEmailScreen"
          component={SignUpEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpBirthScreen"
          component={SignUpBirth}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="SignUpGenderScreen"
          component={SignUpGender}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpNicknameScreen"
          component={SignUpNickname}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpNumberScreen"
          component={SignUpNumber}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpPasswordScreen"
          component={SignUpPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUpProfileScreen"
          component={SignUpProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTab"
          component={MainTab} // 탭 내보내기
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
