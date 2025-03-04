import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function MypageScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={{ height: "25%", justifyContent: "center", backgroundColor: "orange" }}>
        <Text style={{ fontSize: 25 }}>마이페이지</Text>
      </View>

      {/* 프로필 컨테이너 */}
      <View style={styles.profileContainer}>
        <View style={styles.profileImageWrapper}>
          <Image
            source={{
              uri: "https://smartcdn.gprod.postmedia.digital/healthing/wp-content/uploads/2022/05/GettyImages-648509510-e1651686721279.jpg?quality=90&strip=all&w=704&h=395",
            }}
            style={styles.profileImage}
          />
        </View>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editProfileButtonText}>편집</Text>
        </TouchableOpacity>
        <Text style={styles.nickname}>오주영천재</Text>
      </View>

      <View style={{
        height: '20%',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'red',
        backgroundColor: 'yellow',
        width: '85%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
      }}>
        <Text style={{
          position: 'absolute',
          fontWeight: 'bold',
          fontSize: 18,
          left: 8,
          top: 8,
        }}>오늘의 건강</Text>
        <View style={{
          backgroundColor: 'lightgray',
          alignItems: 'center',
          marginTop: 20,
        }}>
          <Ionicons name="fast-food-outline" size={24} color="black" />
          <Text>1600/1800 cal</Text>
          <Text>칼로리 섭취량</Text>
        </View>
        <View style={{
          backgroundColor: 'lightgray',
          alignItems: 'center',
          marginTop: 20,
        }}>
          <Ionicons name="water-outline" size={24} color="black" />
          <Text>3/10잔</Text>
          <Text>수분 섭취량</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "gray",
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "yellow",
    width: "85%",
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 20,
    position: "relative",
    height: "15%",
    justifyContent: "flex-end",
  },
  profileImageWrapper: {
    position: "absolute", // 이미지가 컨테이너 밖으로 나올 수 있도록 설정
    top: -50, // 컨테이너 상단 경계에 걸쳐지도록 위치 조정
    zIndex: 1, // 이미지가 컨테이너 위로 표시되도록 설정
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // 원형 이미지
    borderWidth: 3,
    borderColor: "#fff", // 이미지 테두리 색상 (배경과 구분)
  },
  nickname: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 13,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  editProfileButtonText: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
