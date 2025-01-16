import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./login";
import SignUpEmail from "./signUpEmail";
import SignUpBirth from "./signUpBirth";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    const isLoggedIn = false; // 로그인 여부를 확인하는 로직 (수정 필요)

    return (
        <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
            {!isLoggedIn && (
                <Stack.Screen name="Login" component={Login} />
            )}
            <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
            <Stack.Screen name="SignUpBirth" component={SignUpBirth} />
        </Stack.Navigator>
    );
}
