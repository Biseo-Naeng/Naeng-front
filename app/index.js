import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Stack, Link } from "expo-router";

export default function App() {
  return (
    <>
      <Stack screenOptions={styles.screenOptions}>
        {/* Stack Navigator */}
      </Stack>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the App</Text>
        {/* 로그인 페이지로 이동 */}
        <Link href="/login" style={styles.button}>
          <Text style={styles.buttonText}>Go to Login</Text>
        </Link>
        {/* 회원가입 페이지로 이동 */}
        <Link href="/signup" style={styles.button}>
          <Text style={styles.buttonText}>Go to Signup</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenOptions: {
    headerShown: false,
    contentStyle: {
      backgroundColor: "#fff",
    },
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
