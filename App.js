import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";

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
import RecipeScreen from "./src/screens/RecipeScreen"; // 레시피 화면
import FriendScreen from "./src/screens/FriendScreen"; // 친구 화면
import MypageScreen from "./src/screens/MypageScreen"; // 마이페이지 화면

import { fonts } from "./src/utils/fontStyles";

const Stack = createStackNavigator();
// 시작 화면 상수 정의

const INITIAL_ROUTE_NAME = "LoginScreen";

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

  const screens = [
    { name: "LoginScreen", component: LoginScreen },
    { name: "SignUpNameScreen", component: SignUpName },
    { name: "SignUpEmailScreen", component: SignUpEmail },
    { name: "SignUpBirthScreen", component: SignUpBirth },
    { name: "MainScreen", component: MainScreen },
    { name: "SignUpGenderScreen", component: SignUpGender },
    { name: "SignUpNicknameScreen", component: SignUpNickname },
    { name: "SignUpNumberScreen", component: SignUpNumber },
    { name: "SignUpPasswordScreen", component: SignUpPassword },
    { name: "SignUpProfileScreen", component: SignUpProfile },
    { name: "RecipeScreen", component: RecipeScreen },
    { name: "FriendScreen", component: FriendScreen },
    { name: "MypageScreen", component: MypageScreen },
  ];

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
        {screens.map(({ name, component }) => (
          <Stack.Screen
            key={name}
            name={name}
            component={component}
            options={{ headerShown: false }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
