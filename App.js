import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import a from "./screens/a";
import b from "./screens/b";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="a">
        <Stack.Screen name="a" component={a} />
        <Stack.Screen name="b" component={b} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
