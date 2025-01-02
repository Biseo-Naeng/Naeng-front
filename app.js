import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const navigation = useNavigation();

  return (
    <View style={style.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button
        title="Go to Index"
        onPress={() => navigation.navigate("Index")}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <View style={style.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
