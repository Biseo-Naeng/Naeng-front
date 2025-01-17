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

import { fonts } from "./src/utils/fontStyles";

const Stack = createStackNavigator();

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
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
