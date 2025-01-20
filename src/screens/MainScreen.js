import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // React Navigation 사용
import styles from "../styles/MainStyle"; // 스타일 가져오기

export default function MainScreen() {
  const navigation = useNavigation(); // useNavigation으로 네비게이션 객체 가져오기

  const data = [
    {
      section: "냉동실",
      items: [
        { id: "1", name: "고기", label: "Meat" },
        { id: "2", name: "얼음", label: "Ice" },
      ],
    },
    {
      section: "냉장실",
      items: [
        { id: "3", name: "우유", label: "Milk" },
        { id: "4", name: "토마토", label: "Tomato" },
      ],
    },
    {
      section: "실온",
      items: [
        { id: "5", name: "당근", label: "Carrot" },
        { id: "6", name: "상추", label: "Lettuce" },
      ],
    },
  ];

  const renderSection = ({ item }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{item.section}</Text>
      <View style={styles.itemsContainer}>
        {item.items.map((subItem) => (
          <View key={subItem.id} style={styles.item}>
            <Text style={styles.itemLabel}>{subItem.label}</Text>
            <Text style={styles.itemName}>{subItem.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.section}
        renderItem={renderSection}
        contentContainerStyle={styles.list}
      />

      {/* 하단 네비게이션 바 */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Text style={styles.tabIcon}>📦</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("RecipeScreen")}
        >
          <Text style={styles.tabIcon}>👨‍🍳</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("FriendScreen")}
        >
          <Text style={styles.tabIcon}>👥</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("MypageScreen")}
        >
          <Text style={styles.tabIcon}>🙋</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
