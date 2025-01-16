// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import "expo-router/entry"; // expo-router 사용
// import styles from "../src/main_style"; // 스타일 가져오기

// export default function Main() {
//   const data = [
//     {
//       section: "냉동실",
//       items: [
//         { id: "1", name: "고기", label: "Meat" },
//         { id: "2", name: "얼음", label: "Ice" },
//       ],
//     },
//     {
//       section: "냉장실",
//       items: [
//         { id: "3", name: "우유", label: "Milk" },
//         { id: "4", name: "토마토", label: "Tomato" },
//       ],
//     },
//     {
//       section: "야채칸",
//       items: [
//         { id: "5", name: "당근", label: "Carrot" },
//         { id: "6", name: "상추", label: "Lettuce" },
//       ],
//     },
//   ];

//   const renderSection = ({ item }) => (
//     <View style={styles.section}>
//       <Text style={styles.sectionTitle}>{item.section}</Text>
//       <View style={styles.itemsContainer}>
//         {item.items.map((subItem) => (
//           <View key={subItem.id} style={styles.item}>
//             <Text style={styles.itemLabel}>{subItem.label}</Text>
//             <Text style={styles.itemName}>{subItem.name}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* 냉장고 섹션 */}
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.section}
//         renderItem={renderSection}
//         contentContainerStyle={styles.list}
//       />

//       {/* 하단 탭 네비게이션 */}
//       <View style={styles.tabBar}>
//         <TouchableOpacity style={styles.tabItem}>
//           <Text style={styles.tabIcon}>📦</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Text style={styles.tabIcon}>👨‍🍳</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Text style={styles.tabIcon}>👥</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tabItem}>
//           <Text style={styles.tabIcon}>🙋</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 추가 버튼 */}
//       <TouchableOpacity style={styles.addButton}>
//         <Text style={styles.addIcon}>+</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
