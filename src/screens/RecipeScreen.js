import React, { useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, TextInput, TouchableOpacity, ImageBackground } from "react-native";
import { Search, Clock, Bookmark } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';

const todayRecipes = [
  { id: "1", image: "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg", title: "미친 햄버거", time: "30분", difficulty: "쉬움", rating: 4.8 },
  { id: "2", image: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141352.jpg", title: "개미친 치킨", time: "40분", difficulty: "보통", rating: 5.0 },
  { id: "3", image: "https://hungrybynature.com/wp-content/uploads/2017/09/pinch-of-yum-workshop-19.jpg", title: "엄청난 팬케이크", time: "20분", difficulty: "보통", rating: 3.5 },
];

const recommendedRecipes = [
  { id: "3", image: "https://images.immediate.co.uk/production/volatile/sites/30/2022/08/Corndogs-7832ef6.jpg?quality=90&resize=556,505", title: "Muffins with cocoa cream", author: "Emma Olivia", time: "20 Min", difficulty: "EASY", rating: 5.0 },
];

export default function Recipe() {
  const navigation = useNavigation();
  const [bookmarkedRecipes, setBookmarkedRecipes] = useState({});

  const toggleBookmark = (id) => {
    setBookmarkedRecipes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>오늘은 어떤 요리를 해볼까요?</Text>
      <View style={styles.searchContainer}>
        <Search size={20} color="gray" style={styles.searchIcon} />
        <TextInput style={styles.searchBar} placeholder="레시피 또는 재료로 검색하세요" />
      </View>

      <Text style={styles.sectionTitle}>오늘의 레시피🧑‍🍳</Text>
      <FlatList
        style={{ width: 'auto',
          height: 100, }}
        data={todayRecipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate('RecipeDetail', { recipeId: item.id })}>
            <ImageBackground source={{ uri: item.image }} style={styles.recipeImage}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 0.7)']}
                style={styles.gradient}>
                <TouchableOpacity style={styles.todayRecipesBookmark} onPress={() => toggleBookmark(item.id)}>
                  <Bookmark size={24} color={bookmarkedRecipes[item.id] ? "blue" : "gray"} />
                </TouchableOpacity>
                <View style={styles.recipeInfoContainer}>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                  <Text style={styles.recipeDetails}>{item.time} • {item.difficulty} • ⭐ {item.rating}</Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />

      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>추천 레시피</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>전체 보기</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={recommendedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recommendedCard}>
            <Image source={{ uri: item.image }} style={styles.recommendedImage} />
            <View style={styles.recommendedText}>
              <Text style={styles.recipeTitle}>{item.title}</Text>
              <Text style={styles.recipeAuthor}>By {item.author}</Text>
              <View style={styles.recipeStats}>
                <Clock size={14} color="gray" />
                <Text style={styles.recipeTime}>{item.time}</Text>
                <Text style={styles.recipeDifficulty}>{item.difficulty}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16, marginTop: 20, },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: "#f2f2f2", borderRadius: 8, padding: 10 },
  searchIcon: { marginRight: 10 },
  searchBar: { flex: 1 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20 },
  recipeCard: { backgroundColor: "#fff", borderRadius: 8, margin: 10, height: 200,},
  recipeImage: { width: 150, height: 200, borderRadius: 12, overflow: 'hidden' },
  recipeTitle: { fontSize: 14, fontWeight: "bold", marginTop: 5, color: 'white' },
  recipeDetails: { fontSize: 12, color: 'rgb(178, 178, 178)' },
  recipeRating: { fontSize: 12, fontWeight: "bold", color: "#ff9800" },
  recommendedHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 20 },
  seeAll: { color: "#ff6347", fontSize: 14 },
  recommendedCard: { flexDirection: "row", backgroundColor: "#fff", borderRadius: 8, padding: 10, marginTop: 10 },
  recommendedImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  recommendedText: { flex: 1 },
  recipeAuthor: { fontSize: 12, color: "gray" },
  recipeStats: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  recipeTime: { fontSize: 12, marginLeft: 4, color: "gray" },
  recipeDifficulty: { fontSize: 12, marginLeft: 10, color: "gray" },
  topOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 10,
    padding: 2,
  },
  bottomOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 4,
    position: 'absolute',
    bottom: 10,
    right: 10,
    alignSelf: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',

  },
  recipeInfoContainer: {
    padding: 10,
    flexDirection: 'column',
    position: 'absolute',
    bottom: '5%'
  },
  todayRecipesBookmark: {
    position: 'absolute',
    right: 'auto',

  }
});
