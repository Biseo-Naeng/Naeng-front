// app/RecipeScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RecipeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>레시피 화면 예시</Text>
      {/* 여기에 레시피 리스트 / 검색 등 구현 */}
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
