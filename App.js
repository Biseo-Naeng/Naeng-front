import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from './src/screens/LoginScreen';
import SignUpEmail from './src/screens/SignUpEmailScreen';
import SignUpBirth from './src/screens/SignUpBirthScreen';
import MainScreen from './src/screens/MainScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpEmailScreen" component={SignUpEmail} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUpBirthScreen" component={SignUpBirth} options={{ headerShown: false }}/>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
