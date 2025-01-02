import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router"; // expo-router 사용

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [nickname, setNickname] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    if (
      !email ||
      !password ||
      !username ||
      !name ||
      !birthdate ||
      !phoneNumber ||
      !gender ||
      !nickname
    ) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    // API 호출 로직 생략
    Alert.alert("Signup Success", "Signed up successfully!"); // 임시 성공 메시지
    router.push("/"); // 성공 시 기본 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup Page</Text>

      <View style={styles.inputGroup}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Birthdate:</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
          value={birthdate}
          onChangeText={setBirthdate}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Phone Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Gender:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your gender (male/female)"
          value={gender}
          onChangeText={setGender}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text>Nickname:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your nickname"
          value={nickname}
          onChangeText={setNickname}
        />
      </View>

      <Button title="Sign Up" onPress={handleSignup} />
      <Text style={styles.link} onPress={() => router.push("/")}>
        Already have an account? Login
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
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
  link: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
  },
});
