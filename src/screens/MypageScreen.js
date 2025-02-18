// app/ProfileScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MypageScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내 정보 화면 예시</Text>
      {/* 프로필 사진, 닉네임, 로그아웃 버튼 등 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
