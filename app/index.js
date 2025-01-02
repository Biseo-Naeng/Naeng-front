import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>We’ll take care of your refrigerator</Text>
      {/* 로그인 페이지 내의 양식을 바로 노출 */}
      <View style={styles.loginContainer}>
        <View style={styles.inputGroup}>
          <Text>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text>Password:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
        <Button title="Login" onPress={() => alert("Logged in")} />
      </View>
      <Link href="/signup" style={styles.button}>
        <Text style={styles.buttonText}>Go to Signup</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 100,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  loginContainer: {
    width: "100%",
    padding: 40,
    backgroundColor: "#fff",
  },
  link: {
    color: "blue",
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
