import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";

import styles from "../styles/LoginStyle"; // 스타일
import CustomText from "../components/CustomText"; // 커스텀 폰트 텍스트 컴포넌트
import { fonts } from "../utils/fontStyles";
import { images } from "../utils/Images"; // 이미지(logo 등) 집합

export default function LoginScreen() {
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      {/* 헤더(로고) 영역 */}
      <View style={styles.headerContainer}>
        <Image source={images.logo} style={styles.logo} />
      </View>

      {/* 본문(content) 영역 */}
      <View style={styles.contentContainer}>
        {/* <CustomText style={styles.loginTitle} fontFamily={fonts.nBold}>
          LOGIN
        </CustomText> */}

        {/* 로그인 폼 */}
        <View style={styles.loginForm}>
          <View style={styles.inputGroup}>
            <CustomText fontFamily={fonts.nBold}>Email:</CustomText>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              fontFamily={fonts.nBold}
            />
          </View>

          <View style={styles.inputGroup}>
            <CustomText fontFamily={fonts.nBold}>Password:</CustomText>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              fontFamily={fonts.nBold}
            />
          </View>

          {/* 체크박스 + 라벨 */}
          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
            />
            <Text style={styles.paragraph}>아이디 기억하기</Text>
          </View>
        </View>
      </View>

      {/* 풋터(하단 버튼들) 영역 */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => alert("Logged in")}
          style={[styles.button, { marginTop: 10 }]} // styles.button 스타일 적용  (styles.js)
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SignUpEmailScreen", {
              screen: "SignUpEmailScreen",
            })
          }
          style={[styles.button, { marginTop: 10 }]}
        >
          <Text style={styles.buttonText}>Go to Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("MainTab")}
          style={[styles.button, { marginTop: 10 }]}
        >
          <Text style={styles.buttonText}>Main(임시)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
