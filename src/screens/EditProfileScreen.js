import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export default function EditProfileScreen({ navigation }) {
  // State for editable fields
  const [nickname, setNickname] = useState("기본 닉네임");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("010-1234-5678");

  // Non-editable fields
  const userId = "user123";
  const email = "user@example.com";

  const handleSave = () => {
    // Implement save logic here (e.g., API request)
    alert("회원 정보가 수정되었습니다.");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 정보 수정</Text>

      {/* Non-editable Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>아이디</Text>
        <TextInput style={styles.disabledInput} value={userId} editable={false} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>이메일</Text>
        <TextInput style={styles.disabledInput} value={email} editable={false} />
      </View>

      {/* Editable Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>닉네임</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
          placeholder="닉네임 입력"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="새 비밀번호 입력"
          secureTextEntry
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>전화번호</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="전화번호 입력"
          keyboardType="phone-pad"
        />
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>저장</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  disabledInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#999",
  },
  saveButton: {
    backgroundColor: "#3498db",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
