import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function NewSignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
    nickname: "",
    phone: "",
    birth: "",
    profilePic: null,
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleGenderChange = (gender) => {
    setForm({ ...form, gender });
  };

  const handleSubmit = () => {
    console.log(form);
    alert("완료!");
  };

  const selectImage = async () => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("권한이 필요합니다.");
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, profilePic: result.assets[0].uri });
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>이름</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} onChangeText={(text) => handleChange("name", text)} />

      <Text>이메일</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} keyboardType="email-address" onChangeText={(text) => handleChange("email", text)} />

      <Text>비밀번호</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} secureTextEntry onChangeText={(text) => handleChange("password", text)} />

      <Text>성별</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity onPress={() => handleGenderChange("Male")} style={{ padding: 10, backgroundColor: form.gender === "Male" ? "blue" : "gray", marginRight: 10 }}>
          <Text style={{ color: "white" }}>남자</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleGenderChange("Female")} style={{ padding: 10, backgroundColor: form.gender === "Female" ? "blue" : "gray" }}>
          <Text style={{ color: "white" }}>여자</Text>
        </TouchableOpacity>
      </View>

      <Text>닉네임</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} onChangeText={(text) => handleChange("nickname", text)} />

      <Text>전화번호</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} keyboardType="phone-pad" onChangeText={(text) => handleChange("phone", text)} />

      <Text>생년월일</Text>
      <TextInput style={{ borderWidth: 1, marginBottom: 20, padding: 5 }} placeholder="YYYY.MM.DD" onChangeText={(text) => handleChange("birth", text)} />

      <Text>프로필 사진 (선택):</Text>
      <TouchableOpacity onPress={selectImage} style={{ borderWidth: 1, padding: 10, alignItems: "center", marginBottom: 10 }}>
        {form.profilePic ? (
          <Image source={{ uri: form.profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        ) : (
          <Text>이미지 선택</Text>
        )}
      </TouchableOpacity>

      <Button title="완료" onPress={handleSubmit} />
    </View>
  );
}
