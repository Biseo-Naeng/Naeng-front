// src/styles/LoginStyle.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // 전체 화면 컨테이너
  container: {
    flex: 1,
    //배경 흰색색
    backgroundColor: "rgb(172, 194, 255)",
    //배경 그라데이션
  },

  // 헤더 (상단 로고 영역)
  headerContainer: {
    height: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // 가로축 가운데 정렬
    paddingHorizontal: 16,
    //backgroundColor: "rgb(255, 255, 255)",

    //가운데정렬
    alignSelf: "center",
    //가로길이
    width: "90%",
    borderRadius: 10,
    marginTop: 20,
  },
  logo: {
    width: "90%",
    padding: 20,
    margin: 20,
    resizeMode: "contain",
    // 가운데 정렬
    alignSelf: "center",
  },

  // 본문 전체 컨테이너
  contentContainer: {
    // 화면 나머지 전체
    flex: 1,
    paddingHorizontal: 16, // 좌우 여백
    marginVertical: 30, // 상하 여백
  },

  // "Login" 타이틀 스타일
  loginTitle: {
    fontSize: 24, // 글자 크기
    marginBottom: 20, // 아래 간격
    color: "#111", // 텍스트 색상
    margin: 10, //외부여백
    //폰트
    fontFamily: "NotoSansKR-Bold",
    //텍스트 정렬
    textAlign: "center",
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
    backgroundColor: "rgb(119, 139, 255)",
    borderRadius: 8,
    padding: 16,
    // 그림자(옵션)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },

  // 이메일, 비밀번호 등 각 인풋 그룹
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    marginTop: 5,
    height: 40,
    borderColor: "#ccc",
    //배경색 진한회색
    backgroundColor: "rgb(236, 241, 255)",
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
    backgroundColor: "#rgb(119, 139, 255)",
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
