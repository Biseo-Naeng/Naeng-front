// app/MainScreen.js
import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import styles from "../styles/MainStyle"; // 기존 스타일
// import "expo-router/entry"; // _layout.js에서 가져가기 때문에 보통 필요 없음

export default function MainScreen() {
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
      section: "야채칸",
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
      {/* 냉장고 섹션 */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.section}
        renderItem={renderSection}
        contentContainerStyle={styles.list}
      />
      {/* 
        기존에 하단 탭을 수동으로 만든 <View style={styles.tabBar}> ... 은 
        제거합니다. (탭 바는 _layout.js의 <Tabs>에서 관리)
      */}
    </View>
  );
}
