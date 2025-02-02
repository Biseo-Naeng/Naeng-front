// src/styles/LoginStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // 전체 화면 컨테이너
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  // 헤더 (상단 로고 영역)
  headerContainer: {
    height: 150,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    // 그림자(Shadow)나 borderBottom 등으로 구분
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android 그림자
  },
  logo: {
    width: 150,
    height: 100,
    margin: 20,
    resizeMode: "contain",
  },

  // 본문 전체 컨테이너
  contentContainer: {
    flex: 1,
    padding: 16,
    // justifyContent, alignItems 등으로 원하는 레이아웃 구성
  },

  // (옵션) 타이틀 영역
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 5,
    fontStyle: "italic",
  },

  // 로그인 폼
  loginForm: {
    backgroundColor: "#fff", // 카드 느낌
    borderRadius: 8,
    padding: 16,
    // 그림자(옵션)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },

  // 이메일, 비밀번호 등 각 인풋 그룹
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    marginTop: 5,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  // 하단 버튼 컨테이너
  footerContainer: {
    padding: 16,
    // flexDirection: "row", justifyContent: "space-around" 등 원하는 대로
    // alignItems: "center",
  },

  // 버튼 스타일
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  // 체크박스 컨테이너
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  paragraph: {
    fontSize: 14,
    color: "#333",
  },
});

export default styles;
