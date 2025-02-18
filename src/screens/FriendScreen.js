// app/CommunityScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FriendScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>커뮤니티 화면 예시</Text>
      {/* 게시판, 댓글, 소셜 기능 등 */}
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
